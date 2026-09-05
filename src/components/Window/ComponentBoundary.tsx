import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  isEditModeOn: boolean;
  onDelete: () => void;
}
export class ComponentBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <div role="alert">
          <p>This component could not load. Its saved data has been kept.</p>
          {this.props.isEditModeOn && (
            <button type="button" onClick={this.props.onDelete}>
              Delete component
            </button>
          )}
        </div>
      );
    return this.props.children;
  }
}
