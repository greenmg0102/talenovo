'use client'
import { useEffect } from "react";

const Contact = () => {

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.js';
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
              src="https://yourcompany.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded"
              scrolling="no"
              height="500px"
              width="100%"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
