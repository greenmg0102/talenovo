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
      <p className="mb-4">Select a product to post the job.</p>
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
