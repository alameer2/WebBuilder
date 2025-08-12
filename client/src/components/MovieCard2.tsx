import { Link } from 'wouter';
import type { Movie } from '@shared/schema';

type Variant = 'vertical' | 'horizontal';

interface MovieCardExplicitProps {
  id: string;
  title: string;
  arabicTitle?: string;
  year?: number;
  posterUrl: string;
  rating?: number;
  quality?: string[];
  type?: 'movie' | 'series' | 'show' | 'episode';
  genre?: string[];
  isNew?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  variant?: Variant;
}

interface MovieCardMovieProps {
  movie: Movie;
  variant?: Variant;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export type MovieCard2Props = MovieCardExplicitProps | MovieCardMovieProps;

export default function MovieCard2(props: MovieCard2Props) {
  const derived = 'movie' in props
    ? {
        id: props.movie.id,
        title: props.movie.title,
        arabicTitle: props.movie.originalTitle ?? undefined,
        year: props.movie.year,
        posterUrl: props.movie.poster,
        rating: props.movie.rating ?? undefined,
        quality: props.movie.quality ? [props.movie.quality] : [],
        type: (props.movie.category as 'movie' | 'series' | 'show' | 'episode') ?? 'movie',
        genre: props.movie.genre ?? [],
        isNew: props.movie.isNew ?? false,
        isFavorite: props.isFavorite ?? false,
        onToggleFavorite: props.onToggleFavorite,
        variant: props.variant ?? 'vertical' as Variant,
      }
    : {
        id: props.id,
        title: props.title,
        arabicTitle: props.arabicTitle,
        year: props.year,
        posterUrl: props.posterUrl,
        rating: props.rating,
        quality: props.quality ?? [],
        type: props.type ?? 'movie',
        genre: props.genre ?? [],
        isNew: props.isNew ?? false,
        isFavorite: props.isFavorite ?? false,
        onToggleFavorite: props.onToggleFavorite,
        variant: props.variant ?? 'vertical',
      };

  const getTypeUrl = () => {
    switch (derived.type) {
      case 'movie': return `/movie/${derived.id}`;
      case 'series': return `/series/${derived.id}`;
      case 'show': return `/show/${derived.id}`;
      case 'episode': return `/episode/${derived.id}`;
      default: return `/movie/${derived.id}`;
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (derived.onToggleFavorite) {
      derived.onToggleFavorite(derived.id);
    }
  };

  return (
    <div className={`entry-box entry-box-1 ${derived.variant === 'horizontal' ? 'entry-horizontal' : ''}`}>
      <div className="box">
        <Link href={getTypeUrl()}>
          <div className="entry-image">
            <img 
              src={derived.posterUrl} 
              className="img-fluid" 
              alt={derived.arabicTitle || derived.title}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/assets/default-poster.jpg';
              }}
            />
            {derived.isNew && (
              <div className="entry-badge new-badge">
                <span className="badge badge-success">جديد</span>
              </div>
            )}
            {derived.quality.length > 0 && (
              <div className="entry-qualities">
                {derived.quality.map((q, index) => (
                  <span key={index} className="quality-badge">{q}</span>
                ))}
              </div>
            )}
          </div>
          <div className="entry-body">
            <h3 className="entry-title">
              {derived.arabicTitle || derived.title}
            </h3>
            {derived.title !== derived.arabicTitle && derived.arabicTitle && (
              <h4 className="entry-subtitle">{derived.title}</h4>
            )}
            <div className="entry-meta">
              {derived.year && <span className="entry-year">{derived.year}</span>}
              {typeof derived.rating === 'number' && (
                <span className="entry-rating">
                  <i className="icon-star"></i>
                  {derived.rating.toFixed(1)}
                </span>
              )}
            </div>
            {derived.genre.length > 0 && (
              <div className="entry-genres">
                {derived.genre.slice(0, 3).map((g, index) => (
                  <span key={index} className="genre-tag">{g}</span>
                ))}
              </div>
            )}
          </div>
        </Link>
        <div className="entry-actions">
          <button 
            onClick={handleFavoriteClick}
            className={`btn-favorite ${derived.isFavorite ? 'active' : ''}`}
            title={derived.isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
          >
            <i className={`icon-${derived.isFavorite ? 'heart' : 'heart-o'}`}></i>
          </button>
        </div>
      </div>
    </div>
  );
}