import type {
  AutocompleteProps,
  CreateOptionModalProps,
  TableColumn,
  TableProps,
} from "@bengali/shared-types";
import {
  lazyRemote,
  useDebouncedSearch,
  type MyOptions,
  type User,
} from "src/shared";
import { useListUsers } from "../../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Table = lazyRemote<TableProps<User>>(() => import("system_design/Table"));
const AutoCompleteCustom = lazyRemote<AutocompleteProps<MyOptions>>(
  () => import("system_design/AutocompleteCustom"),
);
const AddOptionModal = lazyRemote<CreateOptionModalProps>(
  () => import("system_design/AddOptionModal"),
);

export const ListUsersPage = () => {
  const misOpciones = [
    { id: 1, label: "Opción 1" },
    { id: 2, label: "Opción 2" },
  ];
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const filterQuery = queryParams.get("filter") || "";
  const pageQuery = queryParams.get("page") || "";
  const limitQuery = queryParams.get("limit") || "";
  const { data } = useListUsers(filterQuery, pageQuery, Number(limitQuery));
  const [page, setPage] = useState(10);

  const { onSearch } = useDebouncedSearch();

  const columns: TableColumn<User>[] = [
    { key: "full_name", header: "Nombre" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Teléfono" },
    { key: "created_at", header: "Fecha de registro" },
  ];
  return (
    <>
      <div className="p-[20px]">
        <Table
          columns={columns}
          data={data?.users || []}
          page={data?.pagination.page}
          totalCount={data?.pagination.total}
          rowsPerPage={page}
          onRowsPerPageChange={(limit) => {
            const params = new URLSearchParams(search);
            params.set("limit", String(limit));
            params.set("page", "1");
            setPage(limit);
            navigate({ search: `?${params.toString()}` });
          }}
          onPageChange={(p) => {
            const params = new URLSearchParams(search);
            params.set("page", String(p));
            navigate({ search: `?${params.toString()}` });
          }}
          onSearch={onSearch}
          emptyMessage="No hay clientes con esos filtros de búsqueda"
        />
      </div>
      <AutoCompleteCustom
        label="Seleccione un rol"
        onChange={() => {}}
        options={misOpciones}
        addNewText="Agregar nuevo rol"
      />
      <AddOptionModal
        onClose={() => {}}
        onSave={() => {}}
        initialValue="hola"
        open={false}
      />
    </>
  );
};
