// libraries
import { Grid, Cell } from "baseui/layout-grid";

// components
import Counter from "../components/counter";

// utils
import gridJustifyContentCenter from "../utils/gridJustifyContentCenter";

function Home() {
  return (
    <Grid overrides={gridJustifyContentCenter}>
      <Cell span={6}>
        <Counter />
      </Cell>
    </Grid>
  );
}

export default Home;
