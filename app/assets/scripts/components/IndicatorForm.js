import React from 'react';
import Form from 'react-jsonschema-form';

export const schema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {type: 'string', title: 'Indicator Name'},
    description: {
      title: 'Description',
      type: 'string'
    },
    published: {
      title: 'Visibility',
      type: 'boolean',
      enumNames: ['Published', 'Draft']
    },
    private: {
      title: 'Privacy',
      type: 'boolean',
      enumNames: ['Private', 'Public']
    },
    category: {
      type: 'array',
      title: 'Category',
      items: {
        type: 'string',
        enum: [
          'Agriculture Extension & Research',
          'Agro-industry, Marketing & Trade',
          'Crops',
          'Fishing, Aquaculture & Trade',
          'Livestock',
          'Rural Infrastructure & Irrigation'
        ]
      }
    },
    data: {
      type: 'string',
      title: 'Data'
    }
  }
};

const uiSchema = {
  name: {
    'ui:placeholder': 'Unique name'
  },
  description: {
    'ui:widget': 'textarea'
  },
  published: {
    'ui:widget': 'radio'
  },
  private: {
    'ui:widget': 'radio'
  },
  data: {
    'ui:widget': 'textarea',
    classNames: 'large'
  }
};

class IndicatorForm extends React.Component {
  render () {
    return <Form schema={schema}
      onSubmit={this.props.onSubmit}
      formData={this.props.formData}
      uiSchema = {uiSchema}
    >
      <button type='submit' className='btn button--primary'>Submit</button>
      {this.props.children}
    </Form>;
  }

}

export default IndicatorForm;
