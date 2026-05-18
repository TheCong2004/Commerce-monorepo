import 'package:fpdart/fpdart.dart';
import '../../../../core/data/hive_database.dart';
import '../../../../core/error/failure.dart';
import '../../../../core/network/api_client.dart';
import '../../domain/entities/product.dart';
import '../../domain/repositories/product_repository.dart';
import '../models/product_model.dart';

class ProductRepositoryImpl implements ProductRepository {
  final ApiClient apiClient;

  ProductRepositoryImpl(this.apiClient);

  @override
  Future<Either<Failure, List<Product>>> getProducts() async {
    try {
      // 1. Try to fetch from remote server
      final remoteProducts = await apiClient.fetchProducts();
      
      // 2. Sync to local database
      final box = HiveDatabase.productBox;
      await box.clear(); // Clear old local cache to keep fresh sync
      for (final model in remoteProducts) {
        await box.put(model.id, model);
      }
      
      return Right(remoteProducts);
    } catch (e) {
      // 3. Fallback to local cache if remote fails
      try {
        final box = HiveDatabase.productBox;
        final localProducts = box.values.toList();
        return Right(localProducts);
      } catch (cacheError) {
        return Left(CacheFailure(cacheError.toString()));
      }
    }
  }

  @override
  Future<Either<Failure, Product>> getProductByBarcode(String barcode) async {
    try {
      final box = HiveDatabase.productBox;
      final product = box.values.firstWhere(
        (element) => element.barcode == barcode,
        orElse: () => throw Exception('Product not found in local cache'),
      );
      return Right(product);
    } catch (e) {
      return Left(CacheFailure(e.toString()));
    }
  }

  @override
  Future<Either<Failure, void>> addProduct(Product product) async {
    try {
      // 1. Save locally first (offline-first, no blocking)
      final box = HiveDatabase.productBox;
      final model = ProductModel.fromEntity(product);
      await box.put(model.id, model);

      // 2. Attempt remote sync
      try {
        await apiClient.addProduct(product);
      } catch (remoteError) {
        // Log the error but don't block the user in offline mode
        print('Remote sync failed for addProduct: $remoteError');
      }

      return const Right(null);
    } catch (e) {
      return Left(CacheFailure(e.toString()));
    }
  }

  @override
  Future<Either<Failure, void>> updateProduct(Product product) async {
    try {
      // 1. Update locally first
      final box = HiveDatabase.productBox;
      final model = ProductModel.fromEntity(product);
      await box.put(model.id, model);

      // 2. Attempt remote sync
      try {
        await apiClient.updateProduct(product);
      } catch (remoteError) {
        print('Remote sync failed for updateProduct: $remoteError');
      }

      return const Right(null);
    } catch (e) {
      return Left(CacheFailure(e.toString()));
    }
  }

  @override
  Future<Either<Failure, void>> deleteProduct(String id) async {
    try {
      // 1. Delete locally first
      final box = HiveDatabase.productBox;
      await box.delete(id);

      // 2. Attempt remote sync
      try {
        await apiClient.deleteProduct(id);
      } catch (remoteError) {
        print('Remote sync failed for deleteProduct: $remoteError');
      }

      return const Right(null);
    } catch (e) {
      return Left(CacheFailure(e.toString()));
    }
  }
}

