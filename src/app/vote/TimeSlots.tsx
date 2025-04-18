import { formatDate } from "date-fns";
import { HiCheck, HiOutlineX, HiOutlinePlusSm } from "react-icons/hi";
import { TimeSlot } from "../common/type";

type Props = {
  slots: TimeSlot[];
};

export const TimeSlots = ({ slots }: Props) => {
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr className="divide-x divide-gray-200">
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Schedule
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 align-middle text-center text-sm font-semibold text-gray-900"
                  >
                    <HiCheck className="mx-auto" size={20} />
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 align-middle text-center text-lg font-semibold text-gray-900"
                  >
                    ?
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 align-middle text-center text-sm font-semibold text-gray-900"
                  >
                    <HiOutlineX className="mx-auto" size={20} />
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 align-middle text-center text-sm font-semibold text-gray-900"
                  >
                    <button
                      type="button"
                      className="button-rounded button-primary"
                    >
                      <HiOutlinePlusSm aria-hidden="true" className="size-5" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {slots.map((slot) => (
                  <tr key={slot.id} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6">
                      {formatDate(new Date(slot.event_date), "MMMM dd, yyyy")}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                      0
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                      0
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                      0
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
