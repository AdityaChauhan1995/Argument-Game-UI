import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { RectDatePicker } from 'rect-ui-calendar';
import { format } from 'date-fns'


const DefaultInput = ({item, updateColumnValue, openModal, selectDate}) => {
    let selected = '';

    return (
        item.isDateColumn !== true ?
            <Form.Group style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Form.Field width={4}>
                    <Form.Dropdown fluid selection placeholder='Column'
                        value={item.columnName}
                        options={[{ key: item._id, value: item.columnName, text: item.columnDescription }]}
                        />
                </Form.Field>
                <Form.Field width={2}>
                    <Form.Dropdown fluid selection placeholder='Operator'
                        value={item.allowedOperators[0].value}
                        options={item.allowedOperators}
                        />
                </Form.Field>
                <Form.Field width={4}>
                    {
                        item.allowedValues.length > 0 ?
                            (

                                <Form.Dropdown fluid search placeholder={item.columnDescription}
                                    selection
                                    value={item.value === undefined ? '' : item.value}
                                    text={item.value === '[Multiple Values]' ? '[Multiple Values]' : ''}
                                    onChange={(e, d) => { updateColumnValue(item.columnName, d.value) } }
                                    options={item.allowedValues}
                                    />
                            ) :
                            (
                                <Form.Input placeholder={item.columnDescription}
                                    value={item.value === undefined ? '' : item.value}
                                    onChange={(e, d) => { updateColumnValue(item.columnName, d.value) } }
                                    />
                            )
                    }


                </Form.Field>
                

                {
                    (item.allowMultiple && item.allowedOperators[0].value === "=") &&
                    <Form.Field width={1}>
                        <Button primary onClick={() => openModal('default', item.columnName)}>LIST</Button>
                    </Form.Field>

                }

            </Form.Group>
            :
            <Form.Group style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Form.Field width={4} style={{ paddingTop: '18px' }}>
                    <Form.Dropdown fluid selection placeholder='Column'
                        value={item.columnName}
                        options={[{ key: item._id, value: item.columnName, text: item.columnName }]}
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

                {
                    item.allowMultiple &&
                    <Form.Field width={1}>
                        <Button primary onClick={() => openModal('default', item.columnName)}>LIST</Button>
                    </Form.Field>

                }

            </Form.Group>



    )
}



export default DefaultInput;