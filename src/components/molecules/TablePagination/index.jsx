import { useMemo } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
const TablePagination = (props) => {
  const { links } = props;
  const { next_page, prev_page, current_page, total_page } = props.data;

  const pages = useMemo(() => {
    let rows = [];
    if (total_page > 10) {
      for (let i = 1; i <= total_page; i++) {
        if (current_page <= 5 && i < 8) {
          if (i <= 5) {
            rows.push({ lable: i, target: i });
          } else {
            if (i <= current_page + 2) {
              rows.push({ lable: i, target: i });
            }
          }
        } else {
          if (i === 1) {
            rows.push({ lable: i, target: i });
            rows.push({ lable: "...", target: null });
          }
          if (
            (i >= current_page - 2 && i <= current_page) ||
            (i <= current_page + 2 && i > current_page)
          ) {
            rows.push({ lable: i, target: i });
          }

          if (total_page === i && current_page === total_page - 3) {
            rows.push({ lable: i, target: i });
          }
        }
        if (i === total_page && current_page < total_page - 3) {
          rows.push({ lable: "...", target: null });
          rows.push({ lable: i, target: i });
        }
      }
    } else {
      for (let index = 1; index <= total_page; index++) {
        rows.push({ lable: index, target: index });
      }
    }

    return rows;
  }, [props.data]);
  const handleClickPage = (target) => {
    if (target && props.onPageClick) {
      props.onPageClick(target);
    }
  };
  const handleClassname = (link) => {
    if (link.lable === current_page) {
      return " active ";
    } else {
      return " text-neutral-300 ";
    }
  };

  return (
    <div className=" rounded-[4px] bg-slate-100 pagination flex flex-wrap">
      <button
        onClick={() => handleClickPage(prev_page)}
        type="button"
        aria-label="prev-pagination"
        className={!prev_page ? "text-neutral-300 cursor-default" : " "}
      >
        <MdKeyboardArrowLeft className="text-lg " />
      </button>
      {pages.map((r, i) => {
        return (
          <button
            onClick={() => handleClickPage(r.target)}
            key={"page-" + i}
            type="button"
            className={handleClassname(r)}
          >
            {r.lable}
          </button>
        );
      })}
      <button
        onClick={() => handleClickPage(next_page)}
        type="button"
        aria-label="prev-pagination"
        className={!next_page ? "text-neutral-300 cursor-default" : " "}
      >
        <MdKeyboardArrowRight className="text-lg " />
      </button>
    </div>
  );
};

export default TablePagination;
