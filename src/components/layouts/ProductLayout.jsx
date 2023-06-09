import React, { useMemo, useState } from "react";

const ProductLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState([]);

  const categories = useMemo(() => {
    return [
      { label: "All", value: "" },
      { label: "Flip Flaps", value: "Flip Flaps" },
      { label: "Sneakers", value: "Sneakers" },
      { label: "Lace-Up Shoes", value: "Lace-Up Shoes" },
      { label: "Accessories", value: "Accessories" },
    ];
  }, []);
  const sizes = useMemo(() => {
    return [
      { name: 35 },
      { name: 36 },
      { name: 37 },
      { name: 38 },
      { name: 39 },
      { name: 40 },
      { name: 41 },
      { name: 42 },
      { name: 43 },
      { name: 44 },
      { name: 45 },
      { name: 46 },
      { name: 47 },
      { name: 48 },
      { name: 49 },
    ];
  }, []);
  const prices = useMemo(() => {
    return {
      show: false,
      minPrice: 0,
      maxPrice: 10000,
      min: 0,
      max: 10000,
      minthumb: 0,
      maxthumb: 0,
    };
  });
  return (
    <div className="flex justify-center">
      <div className="max-w-[1440px] px-[16px] md:px-[32px] lg:px-[54px] xl:px-[112px] mt-10 w-full">
        <nav className="w-full flex justify-between border-b">
          <div className="pr-4 lg:pr-0 lg:w-full lg:max-w-[250px] flex items-center border-r border-gray-200">
            <h2 className="text-2xl font-semibold">Shoe.</h2>
          </div>
          <div className="p-2 w-full">
            <div className="flex items-center" ng-click="test()">
              <label for="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  ng-model="search"
                  id="simple-search"
                  className="border border-slate-300 text-sm rounded-lg focus:ring-slate-300 focus:border-slate-300 block w-full pl-10 p-2.5"
                  placeholder="Enter product name here"
                  required
                />
              </div>
            </div>
          </div>
        </nav>

        <div className="w-full flex justify-between">
          <aside
            className=" {!showFilter && 'hidden'} fixed w-full max-w-screen top-0 z-[999] pr-10 bg-white lg:static lg:block ld:w-full 
           lg:max-w-[250px] lg:pr-4 flex flex-col gap-4 border-r border-gray-200 min-h-[calc(100vh-100px)] h-full"
          >
            <div className="w-full">
              <div
                className="flex justify-between border-b py-4 cursor-pointer items-center hover:opacity-70"
                ng-click="categories.show = !categories.show"
              >
                <h3 className="text-xl font-semibold">Categories</h3>
                <svg
                  className="w-4 h-4 ml-2 {categories.show && 'transform  rotate-180'} transition-all duration-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
              <ul className="flex flex-col gap-4 list-none	 {!categories.show ? 'max-h-0  overflow-hidden' : 'max-h-full my-4 '} transition-all duration-100 ">
                {categories.map((category, i) => {
                  return (
                    <li key={`category-${i}`}>
                      <div className="flex items-center mr-4">
                        <input
                          id={category - { i }}
                          type="radio"
                          // checked={category.value === choosenCategory}
                          value={category.value}
                          // ng-click="handleCategoryChange(category.value)"
                          name="choosenCategory"
                          n
                          className="w-4 h-4 text-gray-800 bg-gray-100 border-gray-300 focus:ring-gray-500 cursor-pointer"
                        />
                        <label
                          for="category-{i}"
                          className="ml-2 text-sm font-medium text-gray-900 cursor-pointer hover:opacity-70"
                        >
                          {category.label}
                        </label>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="w-full">
              <div
                className="flex justify-between border-b {categories.show && 'border-t'} py-4 cursor-pointer hover:opacity-70 items-center"
                ng-click="prices.show=!prices.show"
              >
                <h3 className="text-xl font-semibold">Price Range</h3>
                <svg
                  className="w-4 h-4 ml-2 {prices.show && 'transform  rotate-180'} transition-all duration-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>

              <div className=" flex justify-center items-center {!prices.show ? 'max-h-0  overflow-hidden' : 'max-h-full mt-4'} transition-all duration-100">
                <div className="relative max-w-xl w-full">
                  <div>
                    <input
                      type="range"
                      min="{prices.min}"
                      max="{prices.max}"
                      ng-model="prices.minPrice"
                      ng-change="mintrigger()"
                      className="absolute appearance-none z-20 opacity-0 w-full cursor-pointer"
                    />

                    <input
                      type="range"
                      min="{prices.min}"
                      max="{prices.max}"
                      ng-model="prices.maxPrice"
                      ng-change="maxtrigger()"
                      className="absolute appearance-none z-20 opacity-0 w-full cursor-pointer"
                    />

                    <div className="relative z-10 h-1">
                      <div className="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>

                      <div
                        className="absolute pointer-events-none z-20 top-0 bottom-0 rounded-md bg-gray-800"
                        // style="right: {prices.maxthumb}%; left:{prices.minthumb}%"
                      ></div>

                      <div
                        className="absolute pointer-events-none z-30 w-4 h-4 top-0 bg-gray-800 rounded-full border border-white -mt-[6px] {prices.minthumb > 50 && '-ml-4'}"
                        // style="left: {prices.minthumb}%"
                      ></div>

                      <div
                        className="absolute z-30 w-4 h-4 top-0 right-0 bg-gray-800 rounded-full border border-white -mt-[6px] {prices.maxthumb > 50 && '-mr-4'}"
                        // style="right: {prices.maxthumb}%"
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span>{prices.minPrice}</span>
                    <span>{prices.maxPrice}</span>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div
                  className="flex justify-between border-b {prices.show && 'border-t'} py-4 cursor-pointer hover:opacity-70 items-center"
                  ng-click="sizes.show=!sizes.show"
                >
                  <h3 className="text-xl font-semibold">Size</h3>
                  <svg
                    className="w-4 h-4 ml-2 {sizes.show && 'transform  rotate-180'} transition-all duration-100"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
                <ul className="flex gap-2 mt-4 w-full list-none flex-wrap  {!sizes.show ? 'max-h-0  overflow-hidden' : 'max-h-full mt-4'} transition-all duration-100">
                  {sizes.map((size, i) => {
                    return (
                      <li key={`size-${i}`} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`size-${i}`}
                          value={size.name}
                          name="size"
                          className="hidden peer"
                          onChange={() => {}}
                        />
                        <label
                          for={`size-${i}`}
                          className="inline-flex items-center justify-center w-10 h-10 font-semibold text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-gray-600 hover:text-gray-600 peer-checked:text-gray-600"
                        >
                          {size.name}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="w-full mt-4 lg:hidden">
              <button
                className="bg-gray-800 text-white w-full p-2 rounded-[4px]"
                type="button"
                ng-click="showFilter=false"
              >
                Apply
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProductLayout;
