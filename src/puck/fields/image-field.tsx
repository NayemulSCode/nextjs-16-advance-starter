import type { CustomField } from '@puckeditor/core';
import { ImageInput } from './image-input';

/** Puck custom field: upload an image (POST /api/upload) or paste a URL. */
export const imageField = (
  label = 'Image',
  kind: 'image' | 'video' = 'image'
): CustomField<string> => ({
  type: 'custom',
  label,
  render: ({ value, onChange, name }) => (
    <ImageInput
      name={name}
      label={label}
      kind={kind}
      value={value}
      onChange={onChange}
    />
  ),
});
