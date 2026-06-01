"use client"
import { PrimaryLayout } from "@/layouts";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { api } from "@/utils/api";
import { useMultiplestepForm } from "@/shared/hooks/useMultipleStep";
import BreadcrumbComponent from "@/shared/components/sidebarCheckout";
import CartStep from "@/shared/features/page/cart/cart";
import CheckoutForm from "@/shared/features/page/cart/form";
import { useState, useEffect } from "react";

import i18nConfig from '../../../next-i18next.config';

export const getStaticProps: GetStaticProps = async context => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale || "en", ["common"], i18nConfig)),
        },
    };
};

const Cart = () => {
    const {
        nextStep,
        currentStepIndex,
    } = useMultiplestepForm(4);

    // Lấy dữ liệu giỏ hàng từ localStorage (tự động cập nhật)
    const [cart, setCart] = useState<any>({
        cart: {
            items: []
        }
    });

    // Lắng nghe sự thay đổi giỏ hàng từ localStorage
    useEffect(() => {
        const loadCart = () => {
            if (typeof window !== "undefined") {
                const checkoutItems = new URLSearchParams(window.location.search).get("checkout_items");
                if (checkoutItems) {
                    try {
                        const items = JSON.parse(checkoutItems);
                        if (Array.isArray(items)) {
                            localStorage.setItem("cart_items", JSON.stringify(items));
                            setCart({
                                cart: { 
                                    items: items
                                }
                            });
                            window.history.replaceState(null, "", window.location.pathname);
                            return;
                        }
                    } catch (error) {
                        console.error("Error parsing checkout items:", error);
                    }
                }

                const savedCart = localStorage.getItem("cart_items");
                if (savedCart) {
                    try {
                        const items = JSON.parse(savedCart);
                        setCart({
                            cart: {
                                items: items
                            }
                        });
                    } catch (error) {
                        console.error("Error parsing cart:", error);
                    }
                }
            }
        };

        // Load lần đầu
        loadCart();

        // Lắng nghe sự kiện cập nhật giỏ hàng từ các trang khác
        window.addEventListener("cart:updated", loadCart);
        window.addEventListener("storage", loadCart);

        return () => {
            window.removeEventListener("cart:updated", loadCart);
            window.removeEventListener("storage", loadCart);
        };
    }, []);

    const cartDelete = (productId: string) => {
        // Lấy giỏ hàng hiện tại từ localStorage
        const currentCart = JSON.parse(localStorage.getItem('cart_items') || '[]');

        // Lọc ra sản phẩm cần xóa
        const updatedCart = currentCart.filter((item: any) => item.id !== productId);

        // Lưu lại vào localStorage
        localStorage.setItem('cart_items', JSON.stringify(updatedCart));

        // Cập nhật state
        setCart({
            cart: {
                items: updatedCart
            }
        });

        // Gửi sự kiện để thông báo giỏ hàng đã thay đổi
        window.dispatchEvent(new CustomEvent('cart:updated', { detail: { success: true, cart: updatedCart } }));
        console.log("🗑️ Deleted product:", productId, "Remaining items:", updatedCart);
    };

    const items = cart?.cart.items || [];
    const isSimCheckout = items.some((item: any) => item?.metadata?.source === "phong-thuy-sim" || item?.metadata?.source_app === "xemboituvi" || item?.id?.startsWith?.("sim-"));

    if (isSimCheckout && currentStepIndex === 0) {
        return <SimCheckout items={items} nextStep={nextStep} cartDelete={cartDelete} />;
    }

    return (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6">
            <BreadcrumbComponent currentStepIndex={currentStepIndex} />
            {currentStepIndex === 0 && <CartStep product={items as any} nextStep={nextStep} cartDelete={cartDelete} />}
            {currentStepIndex === 1 && <CheckoutForm />}
        </div>
    );
};

function formatVnd(value: number) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
    }).format(value || 0);
}

function normalizeSimNumber(item: any) {
    return item?.metadata?.sim_number || item?.title?.replace(/sim phong thuy/i, "").replace(/sim phong thủy/i, "").trim() || item?.id?.replace("sim-", "") || "Sim phong thủy";
}

function SimCheckout({ items, nextStep, cartDelete }: { items: any[]; nextStep: () => void; cartDelete: (id: string) => void }) {
    const mainItem = items[0] || {};
    const quantity = Number(mainItem.quantity || 1);
    const unitPrice = Number(mainItem.unit_price || 0);
    const total = items.reduce((sum, item) => sum + Number(item.unit_price || 0) * Number(item.quantity || 1), 0);
    const metadata = mainItem.metadata || {};
    const simNumber = normalizeSimNumber(mainItem);
    const score = metadata.score || mainItem.variant_title?.match(/(\d+)\/10/)?.[1] || "-";
    const element = metadata.ngu_hanh || mainItem.variant_title?.match(/Ngu hanh ([^-]+)/i)?.[1]?.trim() || "Đang phân tích";

    return (
        <div className="min-h-screen bg-[#f6f0e7] text-slate-950">
            <header className="border-b border-[#ead8bf] bg-white/90 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9a5b16]">Xemboituvi Checkout</p>
                        <h1 className="text-xl font-black md:text-2xl">Thanh toán sim phong thủy</h1>
                    </div>
                    <a href="http://localhost:3001/phong-thuy/phong-thuy-sim" className="rounded-full border border-[#c78b3a] px-4 py-2 text-sm font-bold text-[#8a4b0f] hover:bg-[#fff6e8]">
                        Quay lại chọn sim
                    </a>
                </div>
            </header>

            <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1.35fr_0.65fr]">
                <section className="space-y-5">
                    <div className="overflow-hidden rounded-3xl border border-[#ead8bf] bg-white shadow-sm">
                        <div className="bg-gradient-to-r from-[#6f3d10] via-[#a9661f] to-[#d7a34a] px-6 py-5 text-white">
                            <p className="text-sm font-semibold opacity-90">Sim đã chọn</p>
                            <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                                <h2 className="text-4xl font-black tracking-tight md:text-6xl">{simNumber}</h2>
                                <div className="rounded-2xl bg-white/15 px-5 py-3 text-center backdrop-blur">
                                    <p className="text-xs uppercase tracking-[0.2em] opacity-80">Điểm hợp mệnh</p>
                                    <p className="text-3xl font-black">{score}/10</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 p-6 md:grid-cols-3">
                            <InfoBlock label="Ngũ hành sim" value={element} />
                            <InfoBlock label="Dịch vụ" value="Giữ số và kích hoạt sim" />
                            <InfoBlock label="Số lượng" value={`${quantity} sim`} />
                        </div>

                        <div className="border-t border-[#f0dfc8] p-6">
                            <h3 className="text-lg font-black">Vì sao nên chọn số này?</h3>
                            <div className="mt-4 grid gap-3 md:grid-cols-3">
                                <Reason title="Dễ hiểu" text="Thông tin điểm, ngũ hành và giá được gom vào một nơi." />
                                <Reason title="Minh bạch" text="Không tính phí vận chuyển hay phí ẩn cho sản phẩm số sim." />
                                <Reason title="Nhanh gọn" text="Sau thanh toán, bộ phận hỗ trợ liên hệ xác nhận giữ số." />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-[#ead8bf] bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-black">Quy trình nhận sim</h3>
                        <div className="mt-5 grid gap-4 md:grid-cols-3">
                            <Step number="1" title="Xác nhận số" text="Kiểm tra lại số sim, điểm phong thủy và thông tin liên hệ." />
                            <Step number="2" title="Thanh toán" text="Điền thông tin đơn hàng và hoàn tất thanh toán." />
                            <Step number="3" title="Kích hoạt" text="Nhân viên liên hệ để hướng dẫn giữ số, giao sim hoặc eSIM." />
                        </div>
                    </div>
                </section>

                <aside className="lg:sticky lg:top-6">
                    <div className="rounded-3xl border border-[#ead8bf] bg-white p-6 shadow-sm">
                        <h3 className="text-xl font-black">Tóm tắt đơn hàng</h3>
                        <div className="mt-5 space-y-4">
                            <div className="flex justify-between gap-4">
                                <span className="text-slate-600">Sim phong thủy</span>
                                <span className="font-bold">{formatVnd(unitPrice)}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                <span className="text-slate-600">Phí giữ số</span>
                                <span className="font-bold text-emerald-700">Miễn phí</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                <span className="text-slate-600">Phí giao/kích hoạt</span>
                                <span className="font-bold text-emerald-700">Tư vấn sau</span>
                            </div>
                            <div className="border-t border-dashed border-[#e3cfb4] pt-4">
                                <div className="flex items-end justify-between gap-4">
                                    <span className="text-lg font-black">Tổng thanh toán</span>
                                    <span className="text-3xl font-black text-[#a55813]">{formatVnd(total)}</span>
                                </div>
                            </div>
                        </div>

                        <button onClick={nextStep} className="mt-6 w-full rounded-2xl bg-[#111827] px-5 py-4 text-base font-black text-white shadow-lg hover:bg-[#000]">
                            Tiếp tục thanh toán
                        </button>
                        <button onClick={() => cartDelete(mainItem.id)} className="mt-3 w-full rounded-2xl border border-red-200 px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-50">
                            Xóa sim này
                        </button>

                        <div className="mt-6 rounded-2xl bg-[#fff7e8] p-4 text-sm leading-6 text-[#6d4212]">
                            <b>Lưu ý:</b> Sim sẽ được giữ tạm sau khi tạo đơn. Nếu số đã hết, đội ngũ hỗ trợ sẽ hoàn tiền hoặc gợi ý số tương đương.
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl bg-[#fbf6ef] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b16]">{label}</p>
            <p className="mt-2 text-lg font-black">{value}</p>
        </div>
    );
}

function Reason({ title, text }: { title: string; text: string }) {
    return (
        <div className="rounded-2xl border border-[#efdfc8] p-4">
            <p className="font-black">{title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
        </div>
    );
}

function Step({ number, title, text }: { number: string; title: string; text: string }) {
    return (
        <div className="rounded-2xl bg-[#f8fafc] p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#a55813] text-sm font-black text-white">{number}</div>
            <p className="mt-3 font-black">{title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
        </div>
    );
}

Cart.getLayout = function getLayout(page: any) {
    return (
        <>
            <NextSeo title="Thanh toán sim phong thủy" canonical="/cart" />
            {page}
        </>
    );
};

export default Cart;
