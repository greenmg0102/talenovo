import { useState, useEffect } from 'react';
import { readAboutEdit } from '@/store/action/user/about'

const TermsComponent = () => {

  const [content, setContent] = useState<any>({})

  useEffect(() => {

    async function fetchData() {
      const data = { type: "Terms" }
      let result = await readAboutEdit(data)

      if (result.isOkay) setContent(result.result)
    }
    fetchData()

  }, [])

  return (
    <div dangerouslySetInnerHTML={{ __html: content.description }} />
  );
};

export default TermsComponent;
