import React from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import { RectDatePicker } from 'rect-ui-calendar';
import { format } from 'date-fns'

const DynamicInput = ({ columns, item, updateColumnValue, updateConditionColumn, updateConditionOperator, openModal, deleteCondition, selectDate }) => {
    let selected = '';
    console.log(item.allowedOperators);

    return (
        item.isDateColumn !== true ?
            <Form.Group style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Form.Field width={4}>
                    <Form.Dropdown fluid search selection placeholder='Column Name'
                        value={item.columnName}
                        onChange={(e, d) => { updateConditionColumn(item.key, d.value) } }
                        options={columns}
                        />
                </Form.Field>
                <Form.Field width={2}>
                    <Form.Dropdown fluid selection placeholder='Operator'
                        value={item.operator}
                        onChange={(e, d) => { updateConditionOperator(item.key, d.value) } }
                        options={item.allowedOperators}
                        />
                </Form.Field>
                <Form.Field width={4}>
                    {
                        item.allowedValues.length > 0 ?
                            (
                                <Form.Dropdown fluid search selection placeholder={item.columnName}
                                    value={item.value === undefined ? '' : item.value}
                                    text={item.value === '[Multiple Values]' ? '[Multiple Values]' : ''}
                                    onChange={(e, d) => { updateColumnValue(item.key, d.value, 'dynamic') } }
                                    options={item.allowedValues}
                                    />
                            ) :
                            (
                                <Form.Input placeholder={item.columnName}
                                    value={item.value === undefined ? '' : item.value}
                                    onChange={(e, d) => { updateColumnValue(item.key, d.value, 'dynamic') } }
                                    />
                            )
                    }

                </Form.Field>
                <Form.Field width={6}>
                    {
                        item.hasError && <Icon style={{ position: 'relative', right: '5px' }} fitted color='red' name='exclamation circle' />
                    }
                    {
                        (item.allowMultiple && item.operator === "=") &&
                        <Button primary onClick={() => openModal('dynamic', item.key)}>LIST</Button>
                    }
                    <Button color='red' onClick={() => deleteCondition(item.key)}>DELETE</Button>
                </Form.Field>
            </Form.Group>
            :
            <Form.Group style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Form.Field width={4}>
                    <Form.Dropdown fluid search selection placeholder='Column Name'
                        value={item.columnName}
                        onChange={(e, d) => { updateConditionColumn(item.key, d.value) } }
                        options={columns}
                        />
                </Form.Field>

                <Form.Field width={3} inline>
                    <label>From date</label>
                    <RectDatePicker
                        selected={selected}
                        startYear={2018}
                        onSelect={(selected) => selectDate(item.columnName, "startDate", format(selected, "DD-MMM-YYYY"))} />

                </Form.Field>

                <Form.Field width={3} inline>
                    <label>To date</label>
                    <RectDatePicker

                        placeholder="endDate"
                        selected={selected}
                        startYear={2018}
                        onSelect={(selected) => selectDate(item.columnName, "endDate", format(selected, "DD-MMM-YYYY"))} />

                </Form.Field>
                <Form.Field width={6}>
                    {
                        item.hasError && <Icon style={{ position: 'relative', right: '5px' }} fitted color='red' name='exclamation circle' />
                    }

                </Form.Field>
            </Form.Group>
    )
}

export default DynamicInput;