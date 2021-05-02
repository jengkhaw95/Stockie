import React from "react";
import {
  AiOutlineBarChart,
  AiOutlineProfile,
  AiOutlineShop,
  AiOutlineShopping,
  AiOutlineTool,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";

export default function SideNav() {
  return (
    <div className="fixed h-20 min-h-0 w-full lg:w-60 bottom-0 lg:h-auto lg:max-h-full  flex flex-row lg:flex-col lg:min-h-full bg-white z-10 shadow-lg">
      <div className="hidden lg:block text-2xl border-b font-bold text-green-500 p-8">
        Stockie
      </div>
      <div className="lg:border-b lg:p-8 flex-grow">
        <ul
          className="flex flex-row justify-between h-full lg:h-auto lg:block"
          id="navlinks"
        >
          <li className="lg:py-1 flex-grow w-1/5 lg:w-auto">
            <NavLink
              replace
              exact
              to="/"
              className="flex h-full flex-grow  items-center justify-center lg:items-start lg:justify-start px-3 mx-1 py-0.5 font-medium text-gray-500"
              activeClassName="text-green-500 pt-0 lg:pt-0.5 border-t-2 mx-0 lg:border-t-0 lg:border-l-4 border-green-500 lg:text-black"
            >
              <div className="flex flex-col space-y-1 lg:space-y-0 items-center">
                <div className="lg:hidden">
                  <AiOutlineBarChart size="20px" />
                </div>
                <div className="text-xs lg:text-base">Overview</div>
              </div>
            </NavLink>
          </li>

          <li className="lg:py-1 flex-grow w-1/5 lg:w-auto">
            <NavLink
              replace
              to="/stocks"
              className="flex h-full flex-grow  items-center justify-center lg:items-start lg:justify-start px-3 mx-1 py-0.5 font-medium text-gray-500"
              activeClassName="text-green-500 pt-0 lg:pt-0.5 border-t-2 mx-0 lg:border-t-0 lg:border-l-4 border-green-500 lg:text-black"
            >
              <div className="flex flex-col space-y-1 lg:space-y-0 items-center">
                <div className="lg:hidden">
                  <AiOutlineShopping size="20px" />
                </div>
                <div className="text-xs lg:text-base">Stocks</div>
              </div>
            </NavLink>
          </li>
          <li className="lg:py-1 flex-grow w-1/5 lg:w-auto">
            <NavLink
              replace
              to="/records"
              className="flex h-full flex-grow  items-center justify-center lg:items-start lg:justify-start px-3 mx-1 py-0.5 font-medium text-gray-500"
              activeClassName="text-green-500 pt-0 lg:pt-0.5 border-t-2 mx-0 lg:border-t-0 lg:border-l-4 border-green-500 lg:text-black"
            >
              <div className="flex flex-col space-y-1 lg:space-y-0 items-center">
                <div className="lg:hidden">
                  <AiOutlineProfile size="20px" />
                </div>
                <div className="text-xs lg:text-base">Records</div>
              </div>
            </NavLink>
          </li>
          <li className="lg:py-1 flex-grow w-1/5 lg:w-auto">
            <NavLink
              replace
              to="/store"
              className="flex h-full flex-grow  items-center justify-center lg:items-start lg:justify-start px-3 mx-1 py-0.5 font-medium text-gray-500"
              activeClassName="text-green-500 pt-0 lg:pt-0.5 border-t-2 mx-0 lg:border-t-0 lg:border-l-4 border-green-500 lg:text-black"
            >
              <div className="flex flex-col space-y-1 lg:space-y-0 items-center">
                <div className="lg:hidden">
                  <AiOutlineShop size="20px" />
                </div>
                <div className="text-xs lg:text-base">Store</div>
              </div>
            </NavLink>
          </li>
          <li className="lg:py-1 flex-grow w-1/5 lg:w-auto">
            <NavLink
              replace
              to="/settings"
              className="flex h-full flex-grow  items-center justify-center lg:items-start lg:justify-start px-3 mx-1 py-0.5 font-medium text-gray-500"
              activeClassName="text-green-500 pt-0 lg:pt-0.5 border-t-2 mx-0 lg:border-t-0 lg:border-l-4 border-green-500 lg:text-black"
            >
              <div className="flex flex-col space-y-1 lg:space-y-0 items-center">
                <div className="lg:hidden">
                  <AiOutlineTool size="20px" />
                </div>
                <div className="text-xs lg:text-base">Settings</div>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="hidden lg:block text-sm text-gray-500 font-medium p-8">
        {/*<ul className=" mb-2">
          <li className="lg:py-1">
            <Link replace to="/feedback" className="flex  py-1.5 mx-1">
              Feedback
            </Link>
          </li>
          <li className="lg:py-1">
            <Link replace to="/support" className="flex  py-1.5 mx-1">
              Support
            </Link>
          </li>
        </ul>*/}
        <footer className="py-4 mx-1">
          <div className="whitespace-nowrap font-normal">
            &copy; 2021 Jeng Khaw
          </div>
          <div className="whitespace-nowrap font-normal">
            All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
