// timelineData.js
import { SmileOutlined } from '@ant-design/icons';
export const generateTimelineItems = (videos:any) => {

    const timelineItems = videos.map((video:any) => ({
        color: 'green',
        children: (
            <div key={video.id}>
                {video.videoTitle}
            </div>
        ),
    }));

    timelineItems.push(
        {
            color: '#00CCFF',
            dot: <SmileOutlined />,
            children: <p>Chứng chỉ</p>,
        }
    );

    return timelineItems;
};
