import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

interface Props {
  priority: string;
  handlePriority: (event: SelectChangeEvent) => void;
}

export default function PriorityBox({ priority, handlePriority }: Props) {
  const prioritiesList = [
    {
      name: "low",
    },
    {
      name: "middle",
    },
    {
      name: "high",
    },
  ];

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">priority</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={priority}
          label="Age"
          onChange={handlePriority}
        >
          <MenuItem value="">none</MenuItem>
          {prioritiesList.map((item, index) => (
            <MenuItem key={index} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
