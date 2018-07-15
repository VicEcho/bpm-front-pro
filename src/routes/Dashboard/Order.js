import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Table, Button, Modal, Form, Input, DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

@connect(({ order }) => ({
    order,
}))
class Leave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            formLayout: 'horizontal',
        }
    }
    componentWillMount() {
        this.props.dispatch({
            type: 'order/query'
        })
    }
    // createLeave() {
    //     this.setState({ visible: true });
    // }
    // closeModal() {
    //     this.setState({ visible: false });
    // }
    // confrim() {
    //     this.props.form.validateFieldsAndScroll( (err, value ) => {
    //         if (err) {
    //             return;
    //         }
    //         const startDate = value.date[0].format("YYYY-MM-DD");
    //         const endDate = value.date[1].format("YYYY-MM-DD");
    //         const params = { startDate, endDate, comments: value.comments }
    //         this.props.dispatch({
    //             type: "leave/add",
    //             payload: { ...params }
    //         })

    //     })
    //     this.setState({ visible: false });
    // }
    render() {
        const { orders = [] } = this.props.order;
        // const { visible, formLayout } = this.state;
        // const { getFieldDecorator } = this.props.form;
        // const formItemLayout = {
        //     labelCol: { span: 4 },
        //     wrapperCol: { span: 14 },
        // }
        const columns = [{
            title: '订单号',
            dataIndex: 'id',
            width: '10%',
            editable: true,
        }, {
            title: '订单名称',
            dataIndex: 'name',
            width: '20%',
            editable: true,
        }, {
            title: '顾客',
            dataIndex: 'customer',
            width: '20%',
            editable: true,
        }, {
            title: '金额',
            dataIndex: 'money',
            width: '10%',
            editable: true,
        },{
            title: '券',
            dataIndex: 'ticket',
            width: '20%',
            editable: true,
        }]
        return (
            <Row>
                <Card
                    bordered={false}
                    title="订单列表"
                    style={{ marginTop: 24 }}
                    bodyStyle={{ padding: '0 32px 40px 32px' }}
                >
                <div style={{marginTop: '20px'}}>
                    <Table rowKey="id" dataSource={orders} columns={columns} />
                    </div>
                </Card>
                {/* <Modal visible={visible}
                    onOk={this.confrim.bind(this)}
                    onCancel={this.closeModal.bind(this)}>
                    <Form {...formLayout}>
                        <Form.Item
                            label="请假日期"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('date', {
                                rules: [{
                                    required: true,
                                    message: '请输入日期',
                                }],
                            })(
                                <RangePicker format="YYYY-MM-DD"/>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="备注"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('comments', {
                                rules: [{
                                    required: true,
                                    message: '请输入备注',
                                }],
                            })(
                                <Input placeholder="请输入备注" />
                            )}
                        </Form.Item>
                    </Form>
                </Modal> */}
            </Row>
        );
    }
}
export default Form.create({})(Leave)