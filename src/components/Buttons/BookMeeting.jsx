import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { FiCalendar } from "react-icons/fi";
export default function BookMeeting() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "portfolio-meeting" });
      cal("ui", {
        cssVarsPerTheme: { dark: { "cal-brand": "#ffffff" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <button
      className="px-8 py-4 bg-primary text-secondary rounded-4xl font-medium hover:bg-transparent hover:text-primary hover:border-primary border-2 border-primary duration-150 cursor-pointer flex items-center justify-center gap-2 leading-none"
      data-cal-namespace="portfolio-meeting"
      data-cal-link="faisal-yousuf-afrid-hogc6f/portfolio-meeting"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
    >
      <FiCalendar size={17} />{" "}
      <p className="leading-none">Book a Consultation</p>
    </button>
  );
}
