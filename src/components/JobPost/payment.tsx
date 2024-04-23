import { useState, useEffect } from "react";
import { jobProductionGet } from "@/store/action/admin/jobInfo/jobProduction"
import PaymentItem from '@/components/JobPost/paymentItem'

const Payment = ({ value, warn, setValue }: any) => {

  const [productionList, setProductionList] = useState([])

  useEffect(() => {

    async function fetchData() {
      let result = await jobProductionGet()
      setProductionList(result)
    }
    fetchData()
  }, [])

  return (
    <div>
      <p className="mb-4">Select Job Posting Plan</p>
      <p className="text-[14px] text-gray-400 mb-4 mt-2">All jobs post will be reviewed prior to publishing, once payment have been process, an email will be sent once job listing is activated</p>
      {productionList.map((item: any, index: any) =>
        <PaymentItem
          key={index}
          item={item}
        />
      )}
    </div>
  );
};

export default Payment;
