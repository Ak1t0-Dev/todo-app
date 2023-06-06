import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { CategoriesContext } from "../../pages/Home/Home";
import { useContext } from "react";
import { Category } from "../../../types";

interface Props {
  postCategories: string[];
  handleCategories: (categories: string[]) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function CategoriesChip({
  postCategories,
  handleCategories,
}: Props) {
  const theme = useTheme();
  const categories = useContext<Category[]>(CategoriesContext);

  const handleChange = (event: SelectChangeEvent<typeof postCategories>) => {
    const {
      target: { value },
    } = event;
    handleCategories(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={postCategories}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => {
                const category = categories.find(
                  (item) => item._id.toString() === value
                );
                return <Chip key={value} label={category?.category} />;
              })}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {categories.map((item) => (
            <MenuItem
              key={item._id.toString()}
              value={item._id.toString()}
              style={getStyles(item.category, postCategories, theme)}
            >
              {item.category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
