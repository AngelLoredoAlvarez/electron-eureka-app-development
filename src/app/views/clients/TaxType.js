import React, { useState } from "react";
import AutocompleteSelect from "../../components/AutocompleteSelect";

export const TaxType = ({ error, setFieldValue, taxType, touched }) => {
  const TAX_TYPE_SUGGESTIONS = [
    {
      label: "Impuesto al Valor Agregado (IVA)",
      value: "Impuesto al Valor Agregado (IVA)"
    },
    {
      label: "Impuesto Especial sobre Producción y Servicios (IEPS)",
      value: "Impuesto Especial sobre Producción y Servicios (IEPS)"
    },
    {
      label: "Impuesto sobre Depósito en Efectivo (IDE)",
      value: "Impuesto sobre Depósito en Efectivo (IDE)"
    },
    {
      label: "Impuesto Empresarial a Tasa Única (IETU)",
      value: "Impuesto Empresarial a Tasa Única (IETU)"
    }
  ];

  const [selectedTaxType, setSelectedTaxType] = useState(
    TAX_TYPE_SUGGESTIONS.filter(suggestion => suggestion.value === taxType)
  );

  const getSelectedTaxType = selectedTaxType => {
    setSelectedTaxType(selectedTaxType);
    setFieldValue("taxType", selectedTaxType.value);
  };

  return (
    <AutocompleteSelect
      error={error}
      fullWidth={true}
      handleChange={getSelectedTaxType}
      placeholder="Tipo de Inpuesto..."
      suggestions={TAX_TYPE_SUGGESTIONS}
      touched={touched}
      value={selectedTaxType}
    />
  );
};
