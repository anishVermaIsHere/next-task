import card from './taskcard.module.css';

const tagColors = {
    low: 'bg-green-400',
    medium: 'bg-yellow-400',
    high: 'bg-red-400'

} as const;

const Tag = ({ status }: { status : string }) => { 
    const key = status.toLocaleLowerCase()
    const color = tagColors[key];
    
    return <div className={`${card.tag} ${color} text-center font-semibold`}>{status}</div>
}

export default Tag