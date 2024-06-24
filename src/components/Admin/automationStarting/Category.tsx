import CategoryItem from "@/components/Admin/category/CategoryItem";

const Category = ({
  list,
  activeCategory,
  setCategoryIndex
}: {
  list: any;
  activeCategory: any,
  setCategoryIndex: any
}) => {
  return (
    <div className="flex items-start flex-col lg:block xl:flex">
      {list.map((item: any, index: any) =>
        <CategoryItem
          key={index}
          id={item.id}
          title={item.title}
          activeCategory={activeCategory}
          setCategoryIndex={(id: number) => setCategoryIndex(id)}
        />
      )}
    </div>
  );
};

export default Category;
