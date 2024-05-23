import { useState, useEffect } from 'react';
import { readAboutEdit } from '@/store/action/user/about'

const PolicyComponent = () => {

  const [content, setContent] = useState<any>({})

  useEffect(() => {

    async function fetchData() {
      const data = { type: "Policy" }
      let result = await readAboutEdit(data)

      if (result.isOkay) setContent(result.result)
    }
    fetchData()

  }, [])

  return (
    <div dangerouslySetInnerHTML={{ __html: content.description }} />
  );
};

export default PolicyComponent;
