import Loader from "./Loader";

export default function Section({
  title,
  subtitle,
  headerTitle,
  className,
  children,
  loading = false
}) {

  return (

    <div className={`section ${className || ""}`}>

      <div className="section-inner">

        <Loader loading={loading} />

       <div className="section-header">
  <button>HOME</button>

  {/* Title rendered in the header area when Section receives a `title` prop */}
  {headerTitle ? (
    <div className="section-header__title">{headerTitle}</div>
  ) : (
    <div className="section-header__title" />
  )}

  <button>CONTACT</button>
</div>

        <div className="section-body">

          {title && <h1 className="section-title">{title}</h1>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}

          {children}

        </div>

      </div>

    </div>

  )

}