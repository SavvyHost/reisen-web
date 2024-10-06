import React, { useState } from "react";
import BaseInputField from "@/components/molecules/formik-fields/BaseInputField";
import SelectMonth from "@/components/molecules/selects/SelectMonth";
import SelectNationality from "@/components/molecules/selects/SelectNationality";
import { Form, Formik } from "formik";
import { Minus, Plus, User, Mail, Globe, Calendar, Phone } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import Dropdown from "./Dropdown";
import { useMutate } from "@/hooks/UseMutate";
import DatePickerModal from "@/components/molecules/dataPicker";
import dayjs from "dayjs";
import { Spinner } from "../UI/Spinner";
import { notify } from "@/utils/toast";

function MainDataBookingForm({ DetailTour, setIsThanksVisible }) {
  const { mutate, isPending } = useMutate({
    mutationKey: ["bookings"],
    endpoint: `bookings`,
    onSuccess: () => {
      setIsThanksVisible(true);
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
    fornoneata: true,
  });

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [rangeDays, setRangeDays] = useState(1);

  const handleDateChange = (date, days) => {
    setSelectedDate(date ? dayjs(date) : null);
    setRangeDays(days);
  };

  return (
    <div className="bg-white shadow-md rounded-none p-4 border border-gray-300">
      <Formik
        initialValues={{
          name: "",
          email: "",
          nationality_id: "",
          month: "",
          phone: "",
          start_at: selectedDate ? selectedDate.format("YYYY-MM-DD") : "",
          num_of_adults: 1,
          num_of_children: 0,
          num_of_infants: 0,
          tour_id: DetailTour?.id,
          duration: "",
          phone_code: "+20",
        }}
        onSubmit={(values) =>
          mutate({
            ...values,
            phone: values?.phone.slice(2),
            start_at: selectedDate ? selectedDate.format("YYYY-MM-DD") : "",
          })
        }
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <Dropdown
                items={[]}
                selectedItem={DetailTour?.destination}
                onSelect={() => {}}
                placeholder="Where"
                isDropdownOpen={false}
                setIsDropdownOpen={() => {}}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <BaseInputField
                name="email"
                placeholder="Email"
                type="email"
                className="block w-full border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
              />
              <BaseInputField
                name="name"
                placeholder="Name"
                type="text"
                className="block w-full border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <SelectNationality
                name="nationality_id"
                placeholder="Nationality"
              />
              <div className="flex flex-col space-y-2">
                <PhoneInput
                  placeholder="Enter Your Number"
                  value={values.phone}
                  onChange={(value) => setFieldValue("phone", value)}
                  defaultCountry="EG"
                  className="block w-full my-3 mt-2 pb-2 p-1 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Month Selection */}
              <div className="flex flex-col space-y-2">
                <SelectMonth name="month" placeholder="Select Month" />
              </div>

              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => setIsDatePickerOpen(true)}
                  className="block w-full pl-3 pr-3 py-[6px] justify-center items-center text-gray-400 text-center border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
                >
                  {selectedDate ? (
                    <span className="block text-gray-700">
                      {`${selectedDate.format("YYYY-MM-DD")} to ${selectedDate
                        .add(rangeDays - 1, "day")
                        .format("YYYY-MM-DD")}`}
                    </span>
                  ) : (
                    <span className="block text-gray-500">
                      Select a date range
                    </span>
                  )}
                </button>
              </div>
            </div>

            <DatePickerModal
              open={isDatePickerOpen}
              onClose={() => setIsDatePickerOpen(false)}
              onDateChange={handleDateChange}
              setFieldValue={setFieldValue}
            />

            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { label: "Adults", name: "num_of_adults" },
                { label: "Children", name: "num_of_children" },
                { label: "Infants", name: "num_of_infants" },
              ].map(({ label, name }) => (
                <div key={label} className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <div className="flex items-center justify-between border border-gray-300 rounded-none shadow-sm">
                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue(name, Math.max(0, values[name] - 1))
                      }
                      className="p-2 hover:bg-gray-100 active:bg-gray-200 transition duration-150"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-center min-w-[2rem]">
                      {values[name]}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFieldValue(name, values[name] + 1)}
                      className="p-2 hover:bg-gray-100 active:bg-gray-200 transition duration-150"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Details
              </label>
              <textarea
                placeholder="Tell us More Details"
                className="w-full p-3 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
                rows={4}
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full p-3 bg-green-600 text-white rounded-none hover:bg-green-700 transition duration-150"
              >
                {isPending ? <Spinner /> : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default MainDataBookingForm;
