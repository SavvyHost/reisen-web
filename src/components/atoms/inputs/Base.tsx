// import { forwardRef } from "react";
// import { tv, type VariantProps } from "tailwind-variants";
// import { useIsRTL } from "../../../hooks";

// const GeneralInputClass: string = "form-input px-4 py-[.30rem] w-full";

// const baseInput = tv({
//   base: "!mb-0 rounded-md base-input-style  border-1  border-[#E4E6EF] focus:!border-1 focus:!border-[#E4E6EF] focus:outline-0 focus-shadow-none h-[41px] focus:!shadow-none",
//   variants: {
//     error: {
//       true: "border-mainred",
//     },
//     type: {
//       checkbox:
//         "w-4 h-4 text-mainBlue border-gray-300 rounded focus:ring-mainBlue form-checkbox shadow-none",
//       radio:
//         "w-5 h-5 form-radio text-mainBlue rounded-full focus:ring-mainBlue border-gray-300",
//       text: GeneralInputClass,
//       num: GeneralInputClass,
//       email: GeneralInputClass,
//       password: GeneralInputClass,
//       number: GeneralInputClass,
//       date: GeneralInputClass,
//       time: GeneralInputClass,
//       datetime: GeneralInputClass,
//       month: GeneralInputClass,
//       week: GeneralInputClass,
//       tel: GeneralInputClass,
//       url: GeneralInputClass,
//       search: GeneralInputClass,
//       color: GeneralInputClass,
//     },
//   },
// });

// type BaseInputVariants_TP = VariantProps<typeof baseInput>;

// export interface BaseInputProps_TP
//   extends React.InputHTMLAttributes<HTMLInputElement> {
//   className?: string;
//   autocomplete?: string;
//   error?: boolean;
//   ref?: any;
//   label?: string;
//   labelDirection?: string;
// }

// export const BaseInput = forwardRef(
//   (
//     {
//       error,
//       label,
//       labelDirection = "left",
//       ...props
//     }: BaseInputProps_TP & BaseInputVariants_TP,
//     ref: any
//   ) => {
//     const isRTL = useIsRTL();

//     return (
//       <div
//         className={`flex flex-col ${labelDirection === "right" && "items-end"}`}
//       >
//         {label && (
//           <label
//             htmlFor={props.id}
//             className={`mb-3 text-sm ${
//               labelDirection === "right" && isRTL ? "text-right" : ""
//             }`}
//           >
//             {label}
//           </label>
//         )}
//         <input
//           {...props}
//           type={props.type || "text"}
//           name={props.name}
//           id={props.id}
//           {...(props.placeholder ? { placeholder: props.placeholder } : {})}
//           disabled={props.disabled}
//           className={baseInput({
//             error: error,
//             className: props.className,
//             type: props.type || "text",
//           })}
//           autoComplete={"off"}
//           placeholder={props?.placeholder}
//           value={props.value}
//           ref={ref}
//         />
//       </div>
//     );
//   }
// );
