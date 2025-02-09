import { FC } from "react";
import { Link } from "react-router";

interface IArticleCard {
  title: string;
  description: string;
  image: string;
  href: string;
  author: string;
  source: string;
  date: string;
  category: string;
}

const ArticleCard: FC<IArticleCard> = ({
  title,
  description,
  image,
  href,
  author,
  source,
  category,
  date,
}) => {
  const publishedAt = new Date(date);

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg">
      <Link to={href} target="_blank" aria-label={`Read article: ${title}`}>
        <img
          fetchPriority="high"
          className="rounded-t-lg w-full h-[200px] object-cover"
          src={image ? image : "/default-svp_news.jpg"}
          alt={title}
        />
      </Link>
      <div className="p-5">
        <div className="flex justify-between">
          {publishedAt && (
            <span className="block text-[12px]">{publishedAt.toDateString()}</span>
          )}
          {source && <span className="block text-[12px]">{source}</span>}
          {category && <span className="block text-[12px]">{category}</span>}
        </div>
        <Link to={href} target="_blank">
          <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 h-[85px] overflow-hidden text-ellipsis line-clamp-3">
            {title}
          </h2>
        </Link>
        <p className="mb-3 font-normal text-gray-700 h-[100px] overflow-hidden text-ellipsis line-clamp-4">
          {description}
        </p>

        <div className="flex justify-between items-center">
          <Link
            to={href}
            target="_blank"
            className="flex items-center justify-center shrink-0 w-[120px] h-[40px] text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
          <span className="text-[12px] ml-[6px]">{author}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
