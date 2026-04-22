declare module "system_design/Button" {
  import type { ComponentType } from "react";
  import type { ButtonProps } from "@bengali/shared-types";

  const Button: ComponentType<ButtonProps>;
  export default Button;
}

declare module "system_design/Form" {
  import type { FormComponentProps } from "@bengali/shared-types";
  import type { ComponentType } from "react";
  export interface FormProps extends FormComponentProps {
    children?: React.ReactNode;
  }

  const Form: ComponentType<FormProps>;
  export default Form;
}

declare module "system_design/Table" {
  import type { TableProps } from "@bengali/shared-types";
  import type { ComponentType } from "react";

  const Table: ComponentType<TableProps>;
  export default Table;
}

declare module "system_design/Input" {
  import type { InputProps } from "@bengali/shared-types";
  import type { ComponentType } from "react";

  const Input: ComponentType<InputProps>;
  export default Input;
}

declare module "system_design/Title" {
  import type { TitleProps } from "@bengali/shared-types";
  import type { ComponentType } from "react";
  export interface TitleChildrenProps extends TitleProps {
    children?: React.ReactNode;
  }

  const Title: ComponentType<TitleChildrenProps>;
  export default Title;
}

declare module "system_design/AutocompleteCustom" {
  import type { AutocompleteProps } from "@bengali/shared-types";
  import type { ComponentType } from "react";

  const AutocompleteCustom: ComponentType<AutocompleteProps>;
  export default AutocompleteCustom;
}

declare module "system_design/Sidebar" {
  import type { SidebarProps } from "@bengali/shared-types";
  import type { ComponentType } from "react";

  const Sidebar: ComponentType<SidebarProps>;
  export default Sidebar;
}

declare module "system_design/AddOptionModal" {
  import type { CreateOptionModalProps } from "@bengali/shared-types";
  import type { ComponentType } from "react";

  const AddOptionModal: ComponentType<CreateOptionModalProps>;
  export default AddOptionModal;
}

declare module "system_design/useEventBus" {
  import type { EventCallback, eventTypes } from "@bengali/shared-types";

  export function useEventDispatch(): <K extends keyof eventTypes>(
    event: K,
    ...args: eventTypes[K] extends undefined ? [] : [payload: eventTypes[K]]
  ) => void;

  export function useEventListener<K extends keyof eventTypes>(
    event: K,
    callback: EventCallback<K>,
  ): void;

  export function useEventBus(): {
    dispatch: ReturnType<typeof useEventDispatch>;
    on: typeof useEventListener;
  };
}

declare module "system_design/Toast" {
  import type { ToastProps } from "@bengali/shared-types";
  import type { ComponentType } from "react";

  const Toast: ComponentType<ToastProps>;
  export default Toast;
}

// declare module "system_design/Pagination" {
//   import type { PaginationProps } from "@bengali/shared-types";
//   import type { ComponentType } from "react";

//   const Pagination: ComponentType<PaginationProps>;
//   export default Pagination;
// }
