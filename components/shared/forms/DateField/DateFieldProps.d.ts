interface DateFieldProps {
  onChange: (
    selectedDates: Date[],
    dateStr: string,
    instance: Flatpickr
  ) => void;
  error: string;
  label: string;
  reference: Ref<Flatpickr>
  maxDate?: Date;
  minDate?: Date;
  date?: string;
}
