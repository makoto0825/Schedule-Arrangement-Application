import { Radio, RadioGroup } from '@headlessui/react';
import { HiCheck, HiOutlineX } from 'react-icons/hi';
import { Availability } from '../common/type';

const options = [
  { label: <HiCheck className="mx-auto" size={22} />, value: 'available' },
  { label: <span className="text-lg font-bold">?</span>, value: 'unknown' },
  { label: <HiOutlineX className="mx-auto" size={22} />, value: 'unavailable' },
];

type Props = {
  selectedOption: Availability;
  onChange: (value: Availability) => void;
};

export const AvailabilityOptions = ({ selectedOption, onChange }: Props) => {
  return (
    <RadioGroup
      value={selectedOption}
      onChange={onChange}
      className="flex items-center justify-center gap-x-4"
    >
      {options.map(({ label, value }) => (
        <Radio
          key={value}
          value={value}
          aria-label={value}
          className="group flex size-10 items-center justify-center rounded-full bg-gray-100 data-[checked]:bg-primary data-[checked]:text-white cursor-pointer"
        >
          {label}
        </Radio>
      ))}
    </RadioGroup>
  );
};
