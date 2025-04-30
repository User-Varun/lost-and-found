// components/ProfileMenu.jsx
import { Menu } from "@headlessui/react";
// import { Fragment } from "react";

export default function ProfileMenu() {
  return (
    <div className="relative inline-block text-left">
      <Menu as="div" className="relative">
        <Menu.Button className="inline-flex items-center px-4 py-2 bg-gray-800 text-white  rounded-[50%] h-5 w-5 ">
          U
        </Menu.Button>
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-100" : ""
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-100" : ""
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Settings
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-red-100 text-red-700" : "text-red-500"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Log out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}
