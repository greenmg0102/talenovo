'use client'
import { useEffect } from "react";

const Contact = () => {

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.js";
    document.body.appendChild(script);

    const style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'screen, projection';
    style.innerHTML = '@import url(https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.css);';
    document.head.appendChild(style);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section id="contact" className="overflow-hidden py-8 md:py-12 lg:py-16">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-12">
            <iframe
              title="Feedback Form"
              className="freshwidget-embedded-form"
              id="freshwidget-embedded-form"
              src="https://talenovo-help.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Contact+Talenovo&submitTitle=Send&submitThanks=Thank+you+for+contacting+Talenovo.+We+appreciate+your+inquiry+and+will+get+back+to+you+as+soon+as+possible.+Due+to+a+high+volume+of+requests%2C+please+allow+up+to+24+hours+for+a+response.+We+will+do+our+best+to+assist+you+promptly.&searchArea=no"
              height="500px"
              width="100%"
            >
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
