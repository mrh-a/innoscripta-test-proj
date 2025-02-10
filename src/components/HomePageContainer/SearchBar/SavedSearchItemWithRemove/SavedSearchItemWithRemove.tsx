const SavedSearchItemWithRemove: React.FC<any> = ({
  data,
  innerRef,
  innerProps,
  onItemDelete,
}) => {
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-200"
    >
      <span>{data.label}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onItemDelete(data);
        }}
        className="ml-2 px-2 py-1 text-blue rounded text-sm cursor-pointer"
      >
        X
      </button>
    </div>
  );
};

export default SavedSearchItemWithRemove;
