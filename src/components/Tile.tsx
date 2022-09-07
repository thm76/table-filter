import { Box, HopeComponent } from "@hope-ui/solid";

export const Tile: HopeComponent<"div", {}> = (props) => (
        <Box p="$3" boxShadow="$lg" rounded="$lg" bg="$loContrast" {...props}></Box>);
