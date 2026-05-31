import NatalChart from "@/features/thansohoc/natal-chart/NatalChart";
import IntroNatalChart from "@/features/thansohoc/natal-chart/profilestar";

export default function Page() {
  return (
    <>
      <div className="pt-15">
        <NatalChart />
        <IntroNatalChart />
      </div>
    </>
  );
}
