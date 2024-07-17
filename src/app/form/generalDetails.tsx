import LabelDate from "./elements/labeledDate";
import { LabelInput } from "./elements/labeledInput";
import SelectOption from "./elements/selectOption";

export default function GeneralDetails() {
  return (
    <div className="border rounded-lg p-3 border-slate-200">
      <h3 className="text-slate-500">General Details</h3>
      <div className="flex items-center justify-between">
        <div className="w-1/3">
          <LabelInput labelName="Person Name" fieldName={"person_name"} />
        </div>
        <div className="w-1/3">
          <SelectOption
            labelName={"Customer Name"}
            selectName={"customer_name"}
            options={[{ value: "abc", name: "name" }]}
          />
        </div>
        <div className="w-1/3">
          <LabelDate fieldName={"due_date"} label={"Due Date"} />
        </div>
      </div>
    </div>
  );
}
