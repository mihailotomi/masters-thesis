import config from "@config";
import { DateFormat } from "@utils";

import { DatePicker, DateRangePicker } from "../date-picker";
import { NumberInput } from "../form/form-control/NumberInput";
import { TextInput } from "../form/form-control/TextInput";
import { Switch } from "../switch";
import "./FilterRow.scss";
import { HeadCell } from "./table.types";

export type FilterValue = string | boolean | Date | Date[];

type FilterRowProps<T> = {
  headCells: HeadCell<T>[];
  columnWidths: number[];
  filters: Record<string, FilterValue>;
  onFilterChange: (id: string, value: FilterValue) => void;
};

function FilterRow<T>({ filters, headCells, columnWidths, onFilterChange }: FilterRowProps<T>) {
  return (
    <tr>
      {headCells.map((hcell, index) => (
        <th
          key={String(hcell.id)}
          style={{
            width: `${columnWidths[index]}px`,
          }}
        >
          {hcell.filterType ? (
            hcell.filterType === "text" ? (
              <TextInput
                value={(filters[hcell.id] as string) || ""}
                onChange={(val) => onFilterChange(hcell.id as string, val)}
                className="filterRowInput"
              />
            ) : hcell.filterType === "date" ? (
              <DatePicker
                format="YYYY-MM-DD"
                placeholder="Izaberite datum"
                onChange={(val) => onFilterChange(hcell.id as string, val as Date)}
              />
            ) : hcell.filterType === "number" ? (
              <NumberInput
                value={(filters[hcell.id] as string) || ""}
                onChange={(val) => onFilterChange(hcell.id as string, val)}
                className="filterRowInput"
              />
            ) : hcell.filterType === "date-range" ? (
              <DateRangePicker
                placeholder="Izaberite raspon datuma"
                onChange={(startDate, endDate) =>
                  onFilterChange(hcell.id as string, [startDate, endDate] as Date[])
                }
                format={config.environment.bdmApi.dateFormat as DateFormat}
              />
            ) : hcell.filterType === "boolean" ? (
              <Switch
                onChange={() => onFilterChange(hcell.id as string, !(filters[hcell.id] as boolean))}
                checked={(filters[hcell.id] as boolean) || false}
              />
            ) : (
              <input className="filterRowInput" disabled />
            )
          ) : null}
        </th>
      ))}
    </tr>
  );
}

export default FilterRow;
