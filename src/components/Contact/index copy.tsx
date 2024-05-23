'use client'
import { useState } from "react";
import { message } from 'antd';
import { sendingTicket } from '@/store/action/user/service/ticket'
import NewsLatterBox from "./NewsLatterBox";

const Contact = () => {


  const [ticket, setTicket] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [messageApi, contextHolder] = message.useMessage();

  const onchange = (e: any) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value })
  }

  const submit = async () => {
    if (ticket.message.length < 100) {
      messageApi.error("The message must be at least 100 characters.");
    } else {
      const data = {
        message: ticket.message
      }
      let result = await sendingTicket(data)

      if (result.isOkay) {
        messageApi.success(result.message);
        setTicket({
          ...ticket, message: ""
        })
        // router.push('/');
      }
    }
  }

  return (
    <section id="contact" className="overflow-hidden py-8 md:py-12 lg:py-16">
      {contextHolder}
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-12">
            <div
              className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Need Help? Open a Ticket
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Our support team will get back to you ASAP via email.
              </p>
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      Your Name
                    </label>
                    <input
                      value={ticket.name}
                      onChange={(e: any) => onchange(e)}
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      Your Email
                    </label>
                    <input
                      value={ticket.email}
                      onChange={(e: any) => onchange(e)}
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="mb-8">
                    <label
                      htmlFor="message"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      Your Message
                    </label>
                    <textarea
                      value={ticket.message}
                      onChange={(e: any) => onchange(e)}
                      name="message"
                      rows={5}
                      placeholder="Enter your Message"
                      className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    ></textarea>
                  </div>
                </div>
                <div className="w-full px-4">
                  <button
                    className="rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
                    onClick={submit}
                  >
                    Submit Ticket
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
