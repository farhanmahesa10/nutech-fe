import React, { useState } from "react";
import { useEffect } from "react";
import { TbArrowsSort } from "react-icons/tb";
import { useTable } from "react-table";
import TablePagination from "../TablePagination";
const Table = (props) => {
  const { data, pagination, onPageClick } = props;
  const tableInstance = useTable({ columns: data.thead, data: data.tbody });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  const [activeOrder, setActiveOrder] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const [hasRender, setHasRender] = useState(false);

  const handleOrder = (column) => {
    if (!activeOrder) {
      setOrderStatus("asc");
      setActiveOrder(column);
    } else {
      setActiveOrder(column);
      setOrderStatus(orderStatus === "asc" ? "desc" : "asc");
    }
  };

  useEffect(() => {
    if (hasRender) {
      if (props.onSortBy) {
        let link = `order=${activeOrder}&orderOption=${orderStatus}`;
        props.onSortBy(link);
      }
    }
    if (!hasRender) {
      setHasRender(true);
    }
  }, [activeOrder, orderStatus]);

  return (
    <>
      <div
        className="rounded-[8px] border overflow-x-auto 
       border-slate-500 overflow-hidden mt-[24px] drop-shadow-soft"
      >
        <table
          {...getTableProps()}
          className="table-default w-full min-w-[1200px] table-auto "
        >
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup, headIndex) => (
                // Apply the header row props
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  key={"table-head-" + headIndex}
                >
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column, theadIndex) => (
                      // Apply the header cell props
                      <th
                        {...column.getHeaderProps()}
                        className={
                          column.Header && column.sortable && props.onSortBy
                            ? "cursor-pointer hover:opacity-80"
                            : ""
                        }
                        key={"thead-child-" + theadIndex}
                        onClick={() => {
                          if (
                            column.Header &&
                            column.sortable &&
                            props.onSortBy
                          ) {
                            handleOrder(column.id);
                          }
                        }}
                        width={column.colWidth}
                      >
                        <span className="flex items-center gap-2">
                          {column.render("Header")}
                          {column.Header &&
                            column.sortable &&
                            props.onSortBy && (
                              <TbArrowsSort
                                className={`${
                                  activeOrder === column.id
                                    ? "text-neutral-500"
                                    : "text-neutral-200"
                                } `}
                              />
                            )}
                        </span>
                      </th>
                      // <TableHeader
                      //   column={column}

                      // ></TableHeader>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row, bodyIndex) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()} key={"table-body-" + bodyIndex}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell, tbodyIndex) => {
                        // Apply the cell props
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={"tbody-child-" + tbodyIndex}
                          >
                            {
                              // Render the cell contents
                              cell.render("Cell")
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
      {data.tbody.length < 1 && (
        <div className="text-center p-2 bg-slate-100 mt-1">
          No data available
        </div>
      )}
      {pagination && (
        <div className="mt-[24px] flex justify-end">
          <TablePagination data={pagination} onPageClick={onPageClick} />
        </div>
      )}
    </>
  );
};

export default Table;
