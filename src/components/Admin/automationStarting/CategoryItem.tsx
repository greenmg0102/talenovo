import clsx from 'clsx'
const CategoryItem = ({
  id,
  title,
  activeCategory,
  setCategoryIndex
}: {
  id: number,
  title: string,
  activeCategory: number,
  setCategoryIndex: any
}) => {
  return (
    <div
      className={clsx("cursor-pointer mb-4", id === activeCategory ? 'text-blue-500 font-blod' : '')}
      onClick={() => setCategoryIndex(id)}
    >
      {title}
    </div>
  );
};

export default CategoryItem;
