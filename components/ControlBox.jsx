import { setTool } from '@/features/toolSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';

const tools = [
    {
        name: 'draw',
        icon: `<svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" class="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M4.167 10h11.666" stroke-width="1.5"></path></svg>`
    },
    {
        name: 'rect', icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 17.25H3C2.40326 17.25 1.83097 17.0129 1.40901 16.591C0.987053 16.169 0.75 15.5967 0.75 15V3C0.75 2.40326 0.987053 1.83097 1.40901 1.40901C1.83097 0.987053 2.40326 0.75 3 0.75H15C15.5967 0.75 16.169 0.987053 16.591 1.40901C17.0129 1.83097 17.25 2.40326 17.25 3V15C17.25 15.5967 17.0129 16.169 16.591 16.591C16.169 17.0129 15.5967 17.25 15 17.25Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>` },
    {
        name: 'circle', icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>` },
    {
        name: 'diamond', icon: `<svg width="18" height="18" class="rotate-45" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 17.25H3C2.40326 17.25 1.83097 17.0129 1.40901 16.591C0.987053 16.169 0.75 15.5967 0.75 15V3C0.75 2.40326 0.987053 1.83097 1.40901 1.40901C1.83097 0.987053 2.40326 0.75 3 0.75H15C15.5967 0.75 16.169 0.987053 16.591 1.40901C17.0129 1.83097 17.25 2.40326 17.25 3V15C17.25 15.5967 17.0129 16.169 16.591 16.591C16.169 17.0129 15.5967 17.25 15 17.25Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`}
];


export default function Toolbar() {
    const currentTool = useSelector((state) => state.tool.selectedTool);
    const dispatch = useDispatch();

    return (
        <div className="flex items-center gap-2.5 bg-white p-2 shadow rounded">
            {tools.map((tool) => (
                <Button
                    key={tool.name}
                    className=''
                    variant={currentTool === tool.name ? 'secondary' : 'outline'}
                    onClick={() => { dispatch(setTool(tool.name)) }}
                    dangerouslySetInnerHTML={{ __html: tool?.icon }}
                >

                </Button>
            ))}
        </div>
    );
}
