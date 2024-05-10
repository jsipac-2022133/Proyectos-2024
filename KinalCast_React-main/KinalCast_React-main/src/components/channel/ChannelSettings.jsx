/* eslint-disable react/prop-types */
import { useState } from "react"
import { usernameValidationMessage, validateUsername } from "../../shared/validators/username.validator.js"
import { titleValidationMessage, validateTitle } from "../../shared/validators/title.validator.js"
import { avatarValidationMessage, validateAvatarUrl } from "../../shared/validators/avatar.validator.js"
import { descriptionValidationMessage, validateDescription } from "../../shared/validators/description.validator.js"
import { Input } from "../Input.jsx"

export const ChannelSettings = ({settings, saveSettings}) => {

  const inputs = [
    {
      field: 'username',
      label: 'Username',
      validationMessage: usernameValidationMessage,
      type: 'text'
    },
    {
      field: 'title',
      label: 'Title',
      validationMessage: titleValidationMessage,
      type: 'text'
    },
    {
      field: 'avatarUrl',
      label: 'Avatar Url',
      validationMessage: avatarValidationMessage,
      type: 'text'
    },
    {
      field: 'description',
      label: 'Description',
      validationMessage: descriptionValidationMessage,
      type: 'text',
      textarea: true
    }
  ]

  const [formState, setFormState] = useState({
    title: {
      isValid: validateTitle(settings.title),
      showError: false,
      value: settings.title,
    },
    username: {
      isValid: validateUsername(settings.username),
      showError: false,
      value: settings.username,
    },
    avatarUrl: {
      isValid: validateAvatarUrl(settings.avatarUrl),
      showError: false,
      value: settings.avatarUrl,
    },
    description: {
      isValid: validateDescription(settings.description),
      showError: false,
      value: settings.description,
    },
  });

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
      },
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case "username":
        isValid = valideteUsername(value);
        break;
      case "avatarUrl":
        isValid = validateAvatarUrl(value);
        break;
      case "description":
        isValid = validateDescription(value);
        break;
      case "title":
        isValid = validateTitle(value);
        break;
      default:
        break;
    }
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid,
      },
    }));
  };

  const handleFormSubmit = (e)=>{
    e.preventDefault()

    saveSettings({
      username: formState.username.value,
      title: formState.title.value,
      description: formState.description.value,
      avatarUrl: formState.avatarUrl.value,
    })

  }

  const isSubmitButtonDisabled =  !formState.username.isValid ||
                                  !formState.title.isValid ||
                                  !formState.description.isValid ||
                                  !formState.avatarUrl.isValid
  return (
    <form onSubmit={handleFormSubmit} className="settings-form">
      {
        inputs.map((input)=> (
          <Input 
            key={input.field}
            field={input.field}
            label={input.label}
            value={formState[input.field].value}
            onChangeHandler={handleInputValueChange}
            onBlurHandler={handleInputValidationOnBlur}
            showErrorMessage={formState[input.field].showError}
            validationMessage={input.validationMessage}
            type={input.type}
            textarea={input.textarea}
          />
        ))
      }
      <button disabled={isSubmitButtonDisabled}>
        Guardar
      </button>
    </form>
  )
}