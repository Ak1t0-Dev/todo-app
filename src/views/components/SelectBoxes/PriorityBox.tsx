import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

export default function PriorityBox() {
  const [priority, setPriority] = useState("");

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

  const handleChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">priority</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={priority}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">none</MenuItem>
          {prioritiesList.map((item, index) => (
            <MenuItem key={index} value={index}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
