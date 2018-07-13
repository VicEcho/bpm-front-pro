import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Table, Button, Modal, Form, Input, DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

@connect(({ leave }) => ({
    leave,
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
            type: 'leave/query'
        })
    }
    createLeave() {
        this.setState({ visible: true });
    }
    closeModal() {
        this.setState({ visible: false });
    }
    confrim() {
        this.props.form.validateFieldsAndScroll( (err, value ) => {
            if (err) {
                return;
            }
            const startDate = value.date[0].format("YYYY-MM-DD");
            const endDate = value.date[1].format("YYYY-MM-DD");
            const params = { startDate, endDate, comments: value.comments }
            this.props.dispatch({
                type: "leave/add",
                payload: { ...params }
            })

        })
        this.setState({ visible: false });
    }
    render() {
        const { leaveDatas = [] } = this.props.leave;
        const { visible, formLayout } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        }
        const columns = [{
            title: '编号',
            dataIndex: 'id',
            width: '10%',
            editable: true,
        }, {
            title: '开始时间',
            dataIndex: 'startDate',
            width: '20%',
            editable: true,
        }, {
            title: '结束时间',
            dataIndex: 'endDate',
            width: '20%',
            editable: true,
        }, {
            title: '天数',
            dataIndex: 'days',
            width: '10%',
            editable: true,
        }, {
            title: '备注',
            dataIndex: 'comments',
            width: '20%',
            editable: true,
        }, {
            title: '状态',
            dataIndex: 'stateName',
            width: '20%',
            editable: true,
        }]
        return (
            <Row>
                <Card
                    bordered={false}
                    title="请假列表"
                    style={{ marginTop: 24 }}
                    bodyStyle={{ padding: '0 32px 40px 32px' }}
                >
                    <Button style={{ marginTop: 20 }} icon="plus" onClick={this.createLeave.bind(this)}>
                        添加
                    </Button>
                    <Table rowKey="id" dataSource={leaveDatas} columns={columns} />
                </Card>
                <Modal visible={visible}
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
                </Modal>
            </Row>
        );
    }
}
export default Form.create({})(Leave)