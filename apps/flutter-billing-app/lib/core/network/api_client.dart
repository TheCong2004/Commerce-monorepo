import 'dart:convert';
import 'package:http/http.dart' as http;
import '../../features/product/data/models/product_model.dart';
import '../../features/product/domain/entities/product.dart';

class ApiClient {
  final http.Client client;
  final String baseUrl;
  final String? adminApiKey; // Optional API key for POST/PATCH/DELETE actions

  ApiClient({
    http.Client? client,
    this.baseUrl = 'https://merchant.thecong2610.workers.dev',
    this.adminApiKey,
  }) : client = client ?? http.Client();

  /// Helper to get request headers
  Map<String, String> _getHeaders() {
    final headers = {
      'Content-Type': 'application/json',
    };
    if (adminApiKey != null && adminApiKey!.isNotEmpty) {
      headers['Authorization'] = 'Bearer $adminApiKey';
    }
    return headers;
  }

  /// Fetches products from the Merchant backend and maps them to POS ProductModels.
  /// Each variant on the backend maps to a unique ProductModel in the POS app.
  Future<List<ProductModel>> fetchProducts() async {
    final response = await client.get(
      Uri.parse('$baseUrl/v1/products'),
      headers: _getHeaders(),
    );

    if (response.statusCode == 200) {
      final Map<String, dynamic> data = jsonDecode(response.body);
      final List<dynamic> items = data['items'] ?? [];
      final List<ProductModel> products = [];

      for (var item in items) {
        final String productId = item['id'] ?? '';
        final String productTitle = item['title'] ?? '';
        final List<dynamic> variants = item['variants'] ?? [];

        for (var variant in variants) {
          final String variantId = variant['id'] ?? '';
          final String sku = variant['sku'] ?? '';
          final String variantTitle = variant['title'] ?? '';
          final num priceCents = variant['price_cents'] ?? 0;

          // Map to 1-tier ProductModel
          products.add(
            ProductModel(
              id: variantId, // Use variant ID as unique product ID in POS
              name: variantTitle.toLowerCase() == 'standard'
                  ? productTitle
                  : '$productTitle ($variantTitle)',
              barcode: sku.isNotEmpty ? sku : variantId,
              price: priceCents.toDouble(),
              stock: 100, // Default fallback stock count
            ),
          );
        }
      }
      return products;
    } else {
      throw Exception('Failed to load products from server: ${response.statusCode}');
    }
  }

  /// Adds a new product to the Merchant backend.
  /// Since the backend is 2-tier (Product -> Variants), we:
  /// 1. Create a Product
  /// 2. Create a variant for it using the provided barcode and price
  Future<void> addProduct(Product product) async {
    // 1. Create the Product
    final productResponse = await client.post(
      Uri.parse('$baseUrl/v1/products'),
      headers: _getHeaders(),
      body: jsonEncode({
        'title': product.name,
        'description': 'Created from Flutter Billing POS',
      }),
    );

    if (productResponse.statusCode == 201) {
      final Map<String, dynamic> productData = jsonDecode(productResponse.body);
      final String productId = productData['id'];

      // 2. Create the Variant associated with the Product
      final variantResponse = await client.post(
        Uri.parse('$baseUrl/v1/products/$productId/variants'),
        headers: _getHeaders(),
        body: jsonEncode({
          'sku': product.barcode,
          'title': 'Standard',
          'price_cents': product.price.toInt(),
        }),
      );

      if (variantResponse.statusCode != 201) {
        throw Exception('Failed to create product variant on server: ${variantResponse.body}');
      }
    } else {
      throw Exception('Failed to create product on server: ${productResponse.body}');
    }
  }

  /// Updates a product/variant on the Merchant backend.
  /// In this simplified model, we update the product title and its variant's price and sku.
  Future<void> updateProduct(Product product) async {
    // Note: To fully update both Product and Variant we would need to know the productId.
    // In our simplified mapping we use variantId as product.id.
    // We can fetch the product details first to find the product ID, or simply update standard values.
    // For safety, let's treat product.id as variantId.
    // Here we can attempt to update the variant details.
    // Since the API requires product ID to patch variants: /v1/products/{id}/variants/{variantId}
    // We can do a fetch of all products to locate the parent product, or try standard update.
    // As a robust workaround, we can fetch products, find the one with matching variantId, and patch it.
    final allProductsResponse = await client.get(Uri.parse('$baseUrl/v1/products'));
    if (allProductsResponse.statusCode == 200) {
      final Map<String, dynamic> data = jsonDecode(allProductsResponse.body);
      final List<dynamic> items = data['items'] ?? [];
      String? parentProductId;
      
      for (var item in items) {
        final List<dynamic> variants = item['variants'] ?? [];
        if (variants.any((v) => v['id'] == product.id)) {
          parentProductId = item['id'];
          break;
        }
      }

      if (parentProductId != null) {
        // Update product title
        await client.patch(
          Uri.parse('$baseUrl/v1/products/$parentProductId'),
          headers: _getHeaders(),
          body: jsonEncode({
            'title': product.name,
          }),
        );

        // Update variant details
        await client.patch(
          Uri.parse('$baseUrl/v1/products/$parentProductId/variants/${product.id}'),
          headers: _getHeaders(),
          body: jsonEncode({
            'sku': product.barcode,
            'price_cents': product.price.toInt(),
          }),
        );
      }
    }
  }

  /// Deletes a variant/product on the Merchant backend.
  Future<void> deleteProduct(String variantId) async {
    final allProductsResponse = await client.get(Uri.parse('$baseUrl/v1/products'));
    if (allProductsResponse.statusCode == 200) {
      final Map<String, dynamic> data = jsonDecode(allProductsResponse.body);
      final List<dynamic> items = data['items'] ?? [];
      String? parentProductId;
      int variantCount = 0;
      
      for (var item in items) {
        final List<dynamic> variants = item['variants'] ?? [];
        if (variants.any((v) => v['id'] == variantId)) {
          parentProductId = item['id'];
          variantCount = variants.length;
          break;
        }
      }

      if (parentProductId != null) {
        if (variantCount > 1) {
          // If product has other variants, just delete this variant
          await client.delete(
            Uri.parse('$baseUrl/v1/products/$parentProductId/variants/$variantId'),
            headers: _getHeaders(),
          );
        } else {
          // If this is the only variant, delete the whole product
          await client.delete(
            Uri.parse('$baseUrl/v1/products/$parentProductId'),
            headers: _getHeaders(),
          );
        }
      }
    }
  }
}
