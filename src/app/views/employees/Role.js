import React from "react";
import AutocompleteSelect from "../../components/AutocompleteSelect";

export class Role extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      roleSuggestions: props.roleSuggestions,
      selectedRole: props.role
        ? props.roleSuggestions.find(role => role.value === props.role)
        : null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      roleSuggestions: nextProps.roleSuggestions
    });
  }

  handleRoleChange = selectedRole => {
    this.setState({
      selectedRole
    });

    this.props.setFieldValue("role", selectedRole.value);
  };

  render() {
    return (
      <AutocompleteSelect
        error={this.props.error}
        isDisabled={this.props.disableRole}
        fullWidth={this.props.fullWidth}
        handleChange={this.handleRoleChange}
        placeholder="Rol..."
        suggestions={this.state.roleSuggestions}
        touched={this.props.touched}
        value={this.state.selectedRole}
      />
    );
  }
}
