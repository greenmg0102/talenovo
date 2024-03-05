import CurrencyList from '@/components/Admin/jobInfoAdmin/CurrencyList'
import CurrencyType from '@/components/Admin/jobInfoAdmin/CurrencyType'
import JobCategory from '@/components/Admin/jobInfoAdmin/JobCategory'
import JobTypeList from '@/components/Admin/jobInfoAdmin/JobTypeList'
import LocationLIst from '@/components/Admin/jobInfoAdmin/LocationList'
import ProductionList from '@/components/Admin/jobInfoAdmin/Production'
import TagList from '@/components/Admin/jobInfoAdmin/TagList'

const JobInfoAdmin = ({
}: {
  }) => {
  return (
    <div className='flex jusitfy-between itmes-start flex-wrap'>
      <JobTypeList
      />
      <JobCategory
      />
      <TagList
      />
      <LocationLIst
      />
      <CurrencyList
      />
      <CurrencyType
      />
      {/* <ProductionList
      /> */}
    </div>
  );
};

export default JobInfoAdmin;


