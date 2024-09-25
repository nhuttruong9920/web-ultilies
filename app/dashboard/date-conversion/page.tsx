"use client";

import formatDateService from "@/app/lib/formatDateService";
import { CopyOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Flex,
  Input,
  InputNumber,
  Row,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
const { Title } = Typography;

export default function Page() {
  const [secondsFrom2010, setSecondsFrom2010] = useState(
    formatDateService.getSecondsIn2010(new Date())
  );
  const [dateFrom2010, setDateFrom2010] = useState<Date>(
    formatDateService.base2010DateTime
  );

  const convertDateTo2010Seconds = (value: dayjs.Dayjs) => {
    const dateObject = value.toDate();
    const result = formatDateService.getSecondsIn2010(dateObject ?? new Date());
    setSecondsFrom2010(result);
  };

  const convertDateTo2010Date = (value: number | null) => {
    const result = formatDateService.getDateIn2010(value ?? 0);
    setDateFrom2010(result);
  };

  const copyToClipboard = (value: string) => {
    return () => {
      navigator.clipboard.writeText(value.toString());
    };
  };

  return (
    <>
      <div className="p-8">
        <Title level={1}>2010 Timestamp Conversion</Title>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Card>
              <Title level={5}>Pick a date</Title>
              <DatePicker
                size="large"
                showTime
                defaultValue={dayjs()}
                allowClear={false}
                onChange={convertDateTo2010Seconds}
                className="w-full"
              />
              <Title level={5}>Seconds from 2010</Title>
              <Flex gap="middle">
                <Input size="large" value={secondsFrom2010} variant="filled" />
                <Button
                  icon={<CopyOutlined />}
                  size="large"
                  type="dashed"
                  onClick={copyToClipboard(secondsFrom2010.toString())}
                />
              </Flex>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card>
              <Title level={5}>Enter seconds from 2010</Title>
              <InputNumber
                size="large"
                min={0}
                defaultValue={0}
                onChange={convertDateTo2010Date}
                className="w-full"
              />
              <Title level={5}>Seconds from 2010</Title>
              <Flex gap="middle">
                <Input
                  size="large"
                  value={dayjs(dateFrom2010).format("YYYY-MM-DD HH:mm:ss")}
                  variant="filled"
                />
                <Button
                  icon={<CopyOutlined />}
                  size="large"
                  type="dashed"
                  onClick={copyToClipboard(
                    dayjs(dateFrom2010).format("YYYY-MM-DD HH:mm:ss")
                  )}
                />
              </Flex>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
