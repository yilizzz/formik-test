import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CatTree = ({ data, checked, expanded, setChecked, setExpanded }) => {
  return (
    <CheckboxTree
      icons={{
        check: <span className="rct-icon rct-icon-check" />,
        uncheck: <span className="rct-icon rct-icon-uncheck" />,
        halfCheck: <span className="rct-icon rct-icon-half-check" />,
        expandClose: <span className="rct-icon rct-icon-expand-close" />,
        expandOpen: <span className="rct-icon rct-icon-expand-open" />,
        expandAll: <span className="rct-icon rct-icon-expand-all" />,
        collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
        parentClose: <span></span>,
        // parentOpen: <span className="rct-icon rct-icon-parent-open" />,
        parentOpen: <span></span>,
        leaf: <span className="rct-icon rct-icon-leaf" />,
      }}
      onlyLeafCheckboxes
      nodes={data}
      checked={checked}
      expanded={expanded}
      onCheck={(checked) => {
        setChecked(checked);
      }}
      onExpand={(expanded) => {
        setExpanded(expanded);
      }}
    />
  );
};
export default CatTree;
