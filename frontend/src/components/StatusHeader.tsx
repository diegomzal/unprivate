import { Spin, Typography } from "antd";
import { useMemo } from "react";
import { StatusTypes, type State } from "../types";
import { ClockCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Text } = Typography;

type StatusHeaderProps = {
  state: State;
};

function StatusHeader({ state }: StatusHeaderProps) {
    const StatusText = useMemo(() => {
        switch (state.status) {
            case StatusTypes.SAVING:
                return <><Text type="warning">Saving...</Text><Spin size="small" style={{ marginLeft: 8 }} /></>;
            case StatusTypes.SAVED:
                return <Text type="success">Saved!</Text>;
            case StatusTypes.ERROR:
                return <Text type="danger">Error</Text>;
            default:
                return <></>;
        }
    }, [state.status]);

    const formattedDate = useMemo(() => {
        if (!state.updatedAt) return 'NEW!';
        try {
            const date = typeof state.updatedAt === 'string' ? new Date(state.updatedAt) : state.updatedAt;
            return new Intl.DateTimeFormat(undefined, {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format(date);
        } catch {
            return '--';
        }
    }, [state.updatedAt]);

    return (
        <Wrapper>
            <StatusWrapper>
                <Text strong>Status:</Text>
                <span>{StatusText}</span>
            </StatusWrapper>
            <DateWrapper>
                <ClockCircleOutlined />
                <span>Last updated: <b>{formattedDate}</b></span>
            </DateWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    background: #f5f6fa;
    border-radius: 8px;
    padding: 14px 24px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
    gap: 24px;
    min-height: 56px;
`

const DateWrapper = styled.div`
    margin-left: auto;
    color: #888;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
`;

const StatusWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export default StatusHeader;