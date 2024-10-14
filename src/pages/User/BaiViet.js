import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TaiKhoanServices from '../../services/User/TaiKhoanServices'
import BaiVietServices from '../../services/User/BaiVietServices'
import { toast } from 'react-toastify';

function getShortDescription(content, length = 100) {
    // Loại bỏ các thẻ HTML
    const plainText = content.replace(/<[^>]+>/g, '');
    // Lấy một số ký tự đầu tiên làm mô tả ngắn
    return plainText.length > length ? plainText.substring(0, length) + '...' : plainText;
}

const BaiViet = () => {
    const [article, setArticle] = useState({});

    useEffect(() => {
        window.scroll(0,0)
       
    }, []);


    return (
        <>
            <main className="position-relative">
                <div className="container">
                    <div className="entry-header entry-header-3 mb-50 mt-50 text-center text-white">
                        <div
                            className="thumb-overlay img-hover-slide border-radius-5 position-relative"
                            style={{ backgroundImage: "url('/bg-articles.jpg')" }}
                        >
                            <div className="position-midded">
                                <div className="entry-meta meta-0 font-small mb-30">
                                    <a href="category.html">
                                        <span className="post-cat bg-warning color-white">Cooking</span>
                                    </a>
                                    <a href="category.html">
                                        <span className="post-cat bg-info color-white">Food</span>
                                    </a>
                                </div>
                                <h1 className="post-title mb-30 text-white">
                                    Ranking Every Kind of Cooking Oil by
                                    <br /> How (Un)healthy They Are
                                </h1>
                                <div className="entry-meta meta-1 font-x-small color-grey text-uppercase text-white">
                                    <span className="post-by text-white">
                                        By{" "}
                                        <a className="text-white" href="author.html">
                                            Adam Liptak{" "}
                                        </a>{" "}
                                        &amp;{" "}
                                        <a className="text-white" href="author.html">
                                            Michael D. Shear
                                        </a>
                                    </span>
                                    <span className="post-on text-white">18/09/2020 09:35 EST</span>
                                    <span className="time-reading text-white">12 mins read</span>
                                    <p className="font-x-small mt-10 text-white">
                                        <span className="hit-count">
                                            <i className="ti-comment mr-5" />
                                            82 comments
                                        </span>
                                        <span className="hit-count">
                                            <i className="ti-heart mr-5" />
                                            68 likes
                                        </span>
                                        <span className="hit-count">
                                            <i className="ti-star mr-5" />
                                            8/10
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*end entry header*/}
                    <div className="row mb-50">
                        <div className="col-lg-2 d-none d-lg-block" />
                        <div className="col-lg-8 col-md-12">
                            <div className="single-social-share single-sidebar-share mt-30">
                                <ul>
                                    <li>
                                        <a
                                            className="social-icon facebook-icon text-xs-center"
                                            target="_blank"
                                            href="#"
                                        >
                                            <i className="ti-facebook" />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="social-icon twitter-icon text-xs-center"
                                            target="_blank"
                                            href="#"
                                        >
                                            <i className="ti-twitter-alt" />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="social-icon pinterest-icon text-xs-center"
                                            target="_blank"
                                            href="#"
                                        >
                                            <i className="ti-pinterest" />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="social-icon instagram-icon text-xs-center"
                                            target="_blank"
                                            href="#"
                                        >
                                            <i className="ti-instagram" />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="social-icon linkedin-icon text-xs-center"
                                            target="_blank"
                                            href="#"
                                        >
                                            <i className="ti-linkedin" />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="social-icon email-icon text-xs-center"
                                            target="_blank"
                                            href="#"
                                        >
                                            <i className="ti-email" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="single-excerpt">
                                <p className="font-large">
                                    Most of us regard cooking oil as nothing more than a means to a
                                    non-sticking end. But (and this is a big, prepare-to-gag kind of but)
                                    the average American consumes a whopping 36 pounds of cooking oils per
                                    year — more than three times as much as in the early 1970s. These oils
                                    contributed more than 400 calories to our daily diet in 2010 (the
                                    Census Bureau suspiciously quit collecting data on how much fat and
                                    oil companies produce in 2011, meaning the Department of Agriculture
                                    can no longer use that data to accurately calculate how many calories
                                    cooking oil contributes to the average American diet).
                                </p>
                            </div>
                            <div className="entry-main-content">
                                <h2>Let’s rank some oils</h2>
                                <hr className="wp-block-separator is-style-wide" />
                                <p>
                                    All of this cooking oil isn’t exactly doing us any good, either:
                                    Physician and biochemist Cate Shanahan, author of Deep Nutrition: Why
                                    Your Genes Need Traditional Food, estimates that, at this point in
                                    time, roughly 45 percent of the average American’s calories come from
                                    refined oils. She’s also told me time and time again that consuming
                                    too much vegetable oil (an umbrella term for plant-based oils) can
                                    result in fatty liver disease, insulin resistance and migraines.
                                </p>
                                <p>
                                    The lesson here: Cooking oils play a massive role in our overall
                                    health, which means choosing healthy oils is a bright idea if you
                                    expect to continue living for as long as humanly possible. To help us
                                    all make better choices, I asked Dana Hunnes, senior dietitian at the
                                    Ronald Reagan UCLA Medical Center and my go-to source for all
                                    nutritional queries, to help me rank every popular cooking oil by how
                                    healthy they are.
                                </p>
                                <h2>With that as our guide</h2>
                                <div className="wp-block-image">
                                    <figure>
                                        <img src="assets/imgs/news-19.jpg" alt="" />
                                        <figcaption>
                                            {" "}
                                            And far contrary smoked some contrary among stealthy{" "}
                                        </figcaption>
                                    </figure>
                                </div>
                                <p>
                                    1. Flaxseed Oil, Pumpkin Seed Oil and Hemp Seed Oil (tied): “These
                                    contain fairly high doses of omega-3 fatty acids from plant-sources,
                                    which are extremely healthy for us,” Hunnes explains, since omega-3
                                    fatty acids decrease inflammation and control blood pressure. “They
                                    also contain good doses of monounsaturated fats, which likely reduce
                                    cholesterol.” There’s a catch, though: Flaxseed oil, pumpkin seed oil
                                    and hemp seed oil all have relatively low smoke points — the
                                    temperatures at which an oil starts to burn and smoke — meaning they
                                    fare better in dressings, spreads and marinades than on the stovetop
                                    or in the oven.
                                </p>
                                <hr className="wp-block-separator is-style-dots" />
                                <p>
                                    Scallop or far crud plain remarkably far by thus far iguana lewd
                                    precociously and and less rattlesnake contrary caustic wow this near
                                    alas and next and pled the yikes articulate about as less cackled
                                    dalmatian in much less well jeering for the thanks blindly sentimental
                                    whimpered less across objectively fanciful grimaced wildly some wow
                                    and rose jeepers outgrew lugubrious luridly irrationally attractively
                                    dachshund.
                                </p>
                                <blockquote className="wp-block-quote is-style-large">
                                    <p>
                                        The advance of technology is based on making it fit in so that you
                                        don't really even notice it, so it's part of everyday life.
                                    </p>
                                    <cite>B. Johnso</cite>
                                </blockquote>
                                <h2>Beaches stretching</h2>
                                <hr className="wp-block-separator is-style-wide" />
                                <div className="wp-block-image">
                                    <figure className="alignleft is-resized">
                                        <video
                                            autoPlay=""
                                            className="photo-item__video"
                                            loop=""
                                            muted=""
                                            preload="none"
                                        >
                                            <source
                                                src="https://player.vimeo.com/external/390988154.sd.mp4?s=2afbf9887b38c30d0501343dec67006c7656f73f&profile_id=139&oauth2_token_id=57447761"
                                                type="video/mp4"
                                            />
                                        </video>
                                        <figcaption>
                                            {" "}
                                            And far contrary smoked some contrary among stealthy{" "}
                                        </figcaption>
                                    </figure>
                                </div>
                                <p>
                                    Less lion goodness that euphemistically robin expeditiously bluebird
                                    smugly scratched far while thus cackled sheepishly rigid after due one
                                    assenting regarding censorious while occasional or this more crane
                                    went more as this less much amid overhung anathematic because much
                                    held one exuberantly sheep goodness so where rat wry well
                                    concomitantly.
                                </p>
                                <h5>What's next?</h5>
                                <p>
                                    Pouted flirtatiously as beaver beheld above forward energetic across
                                    this jeepers beneficently cockily less a the raucously that magic
                                    upheld far so the this where crud then below after jeez enchanting
                                    drunkenly more much wow callously irrespective limpet.
                                </p>
                                <hr className="wp-block-separator is-style-dots" />
                                <p>
                                    Other yet this hazardous oh the until brave close towards stupidly
                                    euphemistically firefly boa some more underneath circa yet on as wow
                                    above ripe or blubbered one cobra bore ouch and this held ably one
                                    hence
                                </p>
                                <h2>Conclusion</h2>
                                <hr className="wp-block-separator is-style-wide" />
                                <p>
                                    Alexe more gulped much garrulous a yikes earthworm wiped because
                                    goodness bet mongoose that along accommodatingly tortoise indecisively
                                    admirable but shark dear some and unwillingly before far vindictive
                                    less much this on more less flexed far woolly from following glanced
                                    resolute unlike far this alongside against icily beyond flabby
                                    accidental.
                                </p>
                                <p className="text-center mt-30">
                                    <a href="#">
                                        <img
                                            className="d-inline border-radius-10"
                                            src="assets/imgs/ads.jpg"
                                            alt=""
                                        />
                                    </a>
                                </p>
                            </div>
                            <div className="entry-bottom mt-50 mb-30">
                                <div className="font-weight-500 entry-meta meta-1 font-x-small color-grey">
                                    <span className="update-on">
                                        <i className="ti ti-reload mr-5" />
                                        Updated 18/09/2020 10:28 EST
                                    </span>
                                    <span className="hit-count">
                                        <i className="ti-comment" />
                                        82 comments
                                    </span>
                                    <span className="hit-count">
                                        <i className="ti-heart" />
                                        68 likes
                                    </span>
                                    <span className="hit-count">
                                        <i className="ti-star" />
                                        8/10
                                    </span>
                                </div>
                                <div className="overflow-hidden mt-30">
                                    <div className="tags float-left text-muted mb-md-30">
                                        <span className="font-small mr-10">
                                            <i className="fa fa-tag mr-5" />
                                            Tags:{" "}
                                        </span>
                                        <a href="category.html" rel="tag">
                                            tech
                                        </a>
                                        <a href="category.html" rel="tag">
                                            world
                                        </a>
                                        <a href="category.html" rel="tag">
                                            global
                                        </a>
                                    </div>
                                    <div className="single-social-share float-right">
                                        <ul className="d-inline-block list-inline">
                                            <li className="list-inline-item">
                                                <span className="font-small text-muted">
                                                    <i className="ti-sharethis mr-5" />
                                                    Share:{" "}
                                                </span>
                                            </li>
                                            <li className="list-inline-item">
                                                <a
                                                    className="social-icon facebook-icon text-xs-center"
                                                    target="_blank"
                                                    href="#"
                                                >
                                                    <i className="ti-facebook" />
                                                </a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a
                                                    className="social-icon twitter-icon text-xs-center"
                                                    target="_blank"
                                                    href="#"
                                                >
                                                    <i className="ti-twitter-alt" />
                                                </a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a
                                                    className="social-icon pinterest-icon text-xs-center"
                                                    target="_blank"
                                                    href="#"
                                                >
                                                    <i className="ti-pinterest" />
                                                </a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a
                                                    className="social-icon instagram-icon text-xs-center"
                                                    target="_blank"
                                                    href="#"
                                                >
                                                    <i className="ti-instagram" />
                                                </a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a
                                                    className="social-icon linkedin-icon text-xs-center"
                                                    target="_blank"
                                                    href="#"
                                                >
                                                    <i className="ti-linkedin" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/*author box*/}
                            <div className="author-bio border-radius-10 bg-white p-30 mb-40">
                                <div className="author-image mb-30">
                                    <a href="author.html">
                                        <img
                                            src="assets/imgs/authors/author.png"
                                            alt=""
                                            className="avatar"
                                        />
                                    </a>
                                </div>
                                <div className="author-info">
                                    <h3>
                                        <span className="vcard author">
                                            <span className="fn">
                                                <a href="author.html" title="Posts by Robert" rel="author">
                                                    Michael D. Shear
                                                </a>
                                            </span>
                                        </span>
                                    </h3>
                                    <h5 className="text-muted">
                                        <span className="mr-15">Elite author</span>
                                        <i className="ti-star" />
                                        <i className="ti-star" />
                                        <i className="ti-star" />
                                        <i className="ti-star" />
                                        <i className="ti-star" />
                                    </h5>
                                    <div className="author-description">
                                        I think all aspiring and professional writers out there will agree
                                        when I say that ‘We are never fully satisfied with our work. We
                                        always feel that we can do better and that our best piece is yet to
                                        be written’.{" "}
                                    </div>
                                    <a href="author.html" className="author-bio-link text-muted">
                                        View all posts
                                    </a>
                                    <div className="author-social">
                                        <ul className="author-social-icons">
                                            <li className="author-social-link-facebook">
                                                <a href="#" target="_blank">
                                                    <i className="ti-facebook" />
                                                </a>
                                            </li>
                                            <li className="author-social-link-twitter">
                                                <a href="#" target="_blank">
                                                    <i className="ti-twitter-alt" />
                                                </a>
                                            </li>
                                            <li className="author-social-link-pinterest">
                                                <a href="#" target="_blank">
                                                    <i className="ti-pinterest" />
                                                </a>
                                            </li>
                                            <li className="author-social-link-instagram">
                                                <a href="#" target="_blank">
                                                    <i className="ti-instagram" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/*related posts*/}
                            <div className="related-posts">
                                <h3 className="mb-30">Related posts</h3>
                                <div className="row">
                                    <article className="col-lg-4">
                                        <div className="background-white border-radius-10 p-10 mb-30">
                                            <div className="post-thumb d-flex mb-15 border-radius-15 img-hover-scale">
                                                <a href="single.html">
                                                    <img
                                                        className="border-radius-15"
                                                        src="assets/imgs/news-2.jpg"
                                                        alt=""
                                                    />
                                                </a>
                                            </div>
                                            <div className="pl-10 pr-10">
                                                <div className="entry-meta mb-15 mt-10">
                                                    <a className="entry-meta meta-2" href="category.html">
                                                        <span className="post-in text-primary font-x-small">
                                                            Politic
                                                        </span>
                                                    </a>
                                                </div>
                                                <h5 className="post-title mb-15">
                                                    <span className="post-format-icon">
                                                        <ion-icon
                                                            name="image-outline"
                                                            role="img"
                                                            className="md hydrated"
                                                            aria-label="image outline"
                                                        />
                                                    </span>
                                                    <a href="single.html">
                                                        The litigants on the screen are not actors
                                                    </a>
                                                </h5>
                                                <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase mb-10">
                                                    <span className="post-by">
                                                        By <a href="author.html">John Nathan</a>
                                                    </span>
                                                    <span className="post-on">8m ago</span>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="col-lg-4">
                                        <div className="background-white border-radius-10 p-10 mb-30">
                                            <div className="post-thumb d-flex mb-15 border-radius-15 img-hover-scale">
                                                <a href="single.html">
                                                    <img
                                                        className="border-radius-15"
                                                        src="assets/imgs/news-5.jpg"
                                                        alt=""
                                                    />
                                                </a>
                                            </div>
                                            <div className="pl-10 pr-10">
                                                <div className="entry-meta mb-15 mt-10">
                                                    <a className="entry-meta meta-2" href="category.html">
                                                        <span className="post-in text-success font-x-small">
                                                            Tech
                                                        </span>
                                                    </a>
                                                </div>
                                                <h5 className="post-title mb-15">
                                                    <span className="post-format-icon">
                                                        <ion-icon
                                                            name="headset-outline"
                                                            role="img"
                                                            className="md hydrated"
                                                            aria-label="headset outline"
                                                        />
                                                    </span>
                                                    <a href="single.html">
                                                        Essential Qualities of Highly Successful Music
                                                    </a>
                                                </h5>
                                                <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase mb-10">
                                                    <span className="post-by">
                                                        By <a href="author.html">K. Steven</a>
                                                    </span>
                                                    <span className="post-on">24m ago</span>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="col-lg-4">
                                        <div className="background-white border-radius-10 p-10">
                                            <div className="post-thumb d-flex mb-15 border-radius-15 img-hover-scale">
                                                <a href="single.html">
                                                    <img
                                                        className="border-radius-15"
                                                        src="assets/imgs/news-7.jpg"
                                                        alt=""
                                                    />
                                                </a>
                                            </div>
                                            <div className="pl-10 pr-10">
                                                <div className="entry-meta mb-15 mt-10">
                                                    <a className="entry-meta meta-2" href="category.html">
                                                        <span className="post-in text-danger font-x-small">
                                                            Global
                                                        </span>
                                                    </a>
                                                </div>
                                                <h5 className="post-title mb-15">
                                                    <a href="single.html">
                                                        Essential Qualities of Highly Successful Music
                                                    </a>
                                                </h5>
                                                <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase mb-10">
                                                    <span className="post-by">
                                                        By <a href="author.html">K. Jonh</a>
                                                    </span>
                                                    <span className="post-on">24m ago</span>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                            {/*Comments*/}
                            <div className="comments-area">
                                <h3 className="mb-30">03 Comments</h3>
                                <div className="comment-list">
                                    <div className="single-comment justify-content-between d-flex">
                                        <div className="user justify-content-between d-flex">
                                            <div className="thumb">
                                                <img src="assets/imgs/authors/author-2.png" alt="" />
                                            </div>
                                            <div className="desc">
                                                <p className="comment">
                                                    Every secret of a writer’s soul, every experience of his life,
                                                    every quality of his mind, is written large in his works.
                                                    Start writing, no matter what. The water does not flow until
                                                    the faucet is turned on.
                                                </p>
                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <h5>
                                                            <a href="#">Alice Rose</a>
                                                        </h5>
                                                        <p className="date">December 4, 2020 at 3:12 pm </p>
                                                    </div>
                                                    <div className="reply-btn">
                                                        <a href="#" className="btn-reply text-uppercase">
                                                            reply
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-list">
                                    <div className="single-comment justify-content-between d-flex">
                                        <div className="user justify-content-between d-flex">
                                            <div className="thumb">
                                                <img src="assets/imgs/authors/author-3.png" alt="" />
                                            </div>
                                            <div className="desc">
                                                <p className="comment">
                                                    You don’t start out writing good stuff. You start out writing
                                                    crap and thinking it’s good stuff, and then gradually you get
                                                    better at it. That’s why I say one of the most valuable traits
                                                    is persistence.
                                                </p>
                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <h5>
                                                            <a href="#">O.Henry</a>
                                                        </h5>
                                                        <p className="date">December 4, 2020 at 3:12 pm </p>
                                                    </div>
                                                    <div className="reply-btn">
                                                        <a href="#" className="btn-reply text-uppercase">
                                                            reply
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-list">
                                    <div className="single-comment justify-content-between d-flex">
                                        <div className="user justify-content-between d-flex">
                                            <div className="thumb">
                                                <img src="assets/imgs/authors/author-16.png" alt="" />
                                            </div>
                                            <div className="desc">
                                                <p className="comment">
                                                    So read on to find some apt quotes for all writing occasions
                                                    from considering to be a writer to experiencing a writers
                                                    block to have already created that masterpiece yet
                                                    contemplating if it’s good enough.
                                                </p>
                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <h5>
                                                            <a href="#">Lima Azumi</a>
                                                        </h5>
                                                        <p className="date">December 4, 2020 at 3:12 pm </p>
                                                    </div>
                                                    <div className="reply-btn">
                                                        <a href="#" className="btn-reply text-uppercase">
                                                            reply
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*comment form*/}
                            <div className="comment-form">
                                <h3 className="mb-30">Leave a Reply</h3>
                                <form className="form-contact comment_form" action="#" id="commentForm">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input
                                                    className="form-control"
                                                    name="name"
                                                    id="name"
                                                    type="text"
                                                    placeholder="Name"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input
                                                    className="form-control"
                                                    name="email"
                                                    id="email"
                                                    type="email"
                                                    placeholder="Email"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <input
                                                    className="form-control"
                                                    name="website"
                                                    id="website"
                                                    type="text"
                                                    placeholder="Website"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <textarea
                                                    className="form-control w-100"
                                                    name="comment"
                                                    id="comment"
                                                    cols={30}
                                                    rows={9}
                                                    placeholder="Write Comment"
                                                    defaultValue={""}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="button button-contactForm">
                                            Post Comment
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/*End row*/}
                    <div className="row">
                        <div className="col-12 text-center mb-50">
                            <a href="#">
                                <img
                                    className="border-radius-10 d-inline"
                                    src="assets/imgs/ads-3.png"
                                    alt=""
                                />
                            </a>
                        </div>
                    </div>
                    <div className="row mb-50">
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="sidebar-widget mb-md-30">
                                <div className="widget-header mb-30">
                                    <h5 className="widget-title">
                                        Top <span>Trending</span>
                                    </h5>
                                </div>
                                <div className="post-aside-style-2">
                                    <ul className="list-post">
                                        <li className="mb-30 wow fadeIn animated">
                                            <div className="d-flex">
                                                <div className="post-thumb d-flex mr-15 border-radius-5 img-hover-scale">
                                                    <a className="color-white" href="single.html">
                                                        <img src="assets/imgs/thumbnail-12.jpg" alt="" />
                                                    </a>
                                                </div>
                                                <div className="post-content media-body">
                                                    <h6 className="post-title mb-10 text-limit-2-row">
                                                        <a href="single.html">
                                                            Marathon Runners Build Their Sport Stride by Stride
                                                        </a>
                                                    </h6>
                                                    <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                                                        <span className="post-by">
                                                            By <a href="author.html">K. Marry</a>
                                                        </span>
                                                        <span className="post-on">4m ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="mb-30 wow fadeIn animated">
                                            <div className="d-flex">
                                                <div className="post-thumb d-flex mr-15 border-radius-5 img-hover-scale">
                                                    <a className="color-white" href="single.html">
                                                        <img src="assets/imgs/thumbnail-13.jpg" alt="" />
                                                    </a>
                                                </div>
                                                <div className="post-content media-body">
                                                    <h6 className="post-title mb-10 text-limit-2-row">
                                                        <a href="single.html">
                                                            Casa Dani, From a Michelin Chef, to Open in Manhattan West
                                                        </a>
                                                    </h6>
                                                    <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                                                        <span className="post-by">
                                                            By <a href="author.html">Mr. John</a>
                                                        </span>
                                                        <span className="post-on">3h ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="wow fadeIn animated">
                                            <div className="d-flex">
                                                <div className="post-thumb d-flex mr-15 border-radius-5 img-hover-scale">
                                                    <a className="color-white" href="single.html">
                                                        <img src="assets/imgs/thumbnail-15.jpg" alt="" />
                                                    </a>
                                                </div>
                                                <div className="post-content media-body">
                                                    <h6 className="post-title mb-10 text-limit-2-row">
                                                        <a href="single.html">
                                                            What Will It Take to Reopen the World to Travel?
                                                        </a>
                                                    </h6>
                                                    <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                                                        <span className="post-by">
                                                            By <a href="author.html">Kenedy</a>
                                                        </span>
                                                        <span className="post-on">4h ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="sidebar-widget mb-md-30">
                                <div className="widget-header mb-30">
                                    <h5 className="widget-title">
                                        Editor <span>Picked</span>
                                    </h5>
                                </div>
                                <div className="post-aside-style-1 border-radius-10 p-20 bg-white">
                                    <ul className="list-post">
                                        <li className="mb-20">
                                            <div className="d-flex">
                                                <div className="post-thumb d-flex mr-15 border-radius-5 img-hover-scale">
                                                    <a className="color-white" href="single.html">
                                                        <img src="assets/imgs/thumbnail-4.jpg" alt="" />
                                                    </a>
                                                </div>
                                                <div className="post-content media-body">
                                                    <h6 className="post-title mb-10 text-limit-2-row">
                                                        <a href="single.html">
                                                            Federal arrests show no sign that antifa plotted protests
                                                        </a>
                                                    </h6>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="mb-20">
                                            <div className="d-flex">
                                                <div className="post-thumb d-flex mr-15 border-radius-5 img-hover-scale">
                                                    <a className="color-white" href="single.html">
                                                        <img src="assets/imgs/thumbnail-15.jpg" alt="" />
                                                    </a>
                                                </div>
                                                <div className="post-content media-body">
                                                    <h6 className="post-title mb-10 text-limit-2-row">
                                                        <a href="single.html">
                                                            How line-dried laundry gets that fresh smell
                                                        </a>
                                                    </h6>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="mb-20">
                                            <div className="d-flex">
                                                <div className="post-thumb d-flex mr-15 border-radius-5 img-hover-scale">
                                                    <a className="color-white" href="single.html">
                                                        <img src="assets/imgs/thumbnail-16.jpg" alt="" />
                                                    </a>
                                                </div>
                                                <div className="post-content media-body">
                                                    <h6 className="post-title mb-10 text-limit-2-row">
                                                        <a href="single.html">
                                                            Traveling tends to magnify all human emotions
                                                        </a>
                                                    </h6>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="post-thumb d-flex mr-15 border-radius-5 img-hover-scale">
                                                    <a className="color-white" href="single.html">
                                                        <img src="assets/imgs/thumbnail-15.jpg" alt="" />
                                                    </a>
                                                </div>
                                                <div className="post-content media-body">
                                                    <h6 className="post-title mb-10 text-limit-2-row">
                                                        <a href="single.html">
                                                            How line-dried laundry gets that fresh smell
                                                        </a>
                                                    </h6>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="sidebar-widget mb-sm-30">
                                <div className="widget-header mb-30">
                                    <h5 className="widget-title">
                                        Most <span>Popular</span>
                                    </h5>
                                </div>
                                <div className="post-aside-style-2">
                                    <ul className="list-post">
                                        <li
                                            className="mb-30 wow fadeIn   animated"
                                            style={{ visibility: "visible", animationName: "fadeIn" }}
                                        >
                                            <div className="d-flex">
                                                <div className="post-thumb d-flex mr-15 border-radius-5 img-hover-scale">
                                                    <a className="color-white" href="single.html">
                                                        <img src="assets/imgs/thumbnail-2.jpg" alt="" />
                                                    </a>
                                                </div>
                                                <div className="post-content media-body">
                                                    <h6 className="post-title mb-10 text-limit-2-row">
                                                        <a href="single.html">
                                                            Vancouver woman finds pictures and videos of herself
                                                            online
                                                        </a>
                                                    </h6>
                                                    <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                                                        <span className="post-by">
                                                            By <a href="author.html">K. Marry</a>
                                                        </span>
                                                        <span className="post-on">4m ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li
                                            className="mb-30 wow fadeIn   animated"
                                            style={{ visibility: "visible", animationName: "fadeIn" }}
                                        >
                                            <div className="d-flex">
                                                <div className="post-thumb d-flex mr-15 border-radius-5 img-hover-scale">
                                                    <a className="color-white" href="single.html">
                                                        <img src="assets/imgs/thumbnail-3.jpg" alt="" />
                                                    </a>
                                                </div>
                                                <div className="post-content media-body">
                                                    <h6 className="post-title mb-10 text-limit-2-row">
                                                        <a href="single.html">
                                                            4 Things Emotionally Intelligent People Don’t Do
                                                        </a>
                                                    </h6>
                                                    <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                                                        <span className="post-by">
                                                            By <a href="author.html">Mr. John</a>
                                                        </span>
                                                        <span className="post-on">3h ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li
                                            className="wow fadeIn animated"
                                            style={{ visibility: "visible", animationName: "fadeIn" }}
                                        >
                                            <div className="d-flex">
                                                <div className="post-thumb d-flex mr-15 border-radius-5 img-hover-scale">
                                                    <a className="color-white" href="single.html">
                                                        <img src="assets/imgs/thumbnail-5.jpg" alt="" />
                                                    </a>
                                                </div>
                                                <div className="post-content media-body">
                                                    <h6 className="post-title mb-10 text-limit-2-row">
                                                        <a href="single.html">
                                                            Reflections from a Token Black Friend
                                                        </a>
                                                    </h6>
                                                    <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase">
                                                        <span className="post-by">
                                                            By <a href="author.html">Kenedy</a>
                                                        </span>
                                                        <span className="post-on">4h ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="widget-header mb-30">
                                <h5 className="widget-title">
                                    Last <span>Comments</span>
                                </h5>
                            </div>
                            <div className="sidebar-widget p-20 border-radius-15 bg-white widget-latest-comments wow fadeIn  animated">
                                <div className="post-block-list post-module-6">
                                    <div className="last-comment mb-20 d-flex wow fadeIn">
                                        <span className="item-count vertical-align">
                                            <a
                                                className="red-tooltip author-avatar"
                                                href="#"
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title=""
                                                data-original-title="Azumi - 985 posts"
                                            >
                                                <img src="assets/imgs/authors/author-14.png" alt="" />
                                            </a>
                                        </span>
                                        <div className="alith_post_title_small">
                                            <p className="font-medium mb-10">
                                                <a href="single.html">
                                                    A writer is someone for whom writing is more difficult than it
                                                    is for other people.
                                                </a>
                                            </p>
                                            <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase mb-10">
                                                <span className="post-by">
                                                    By <a href="author.html">Azumi</a>
                                                </span>
                                                <span className="post-on">4m ago</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="last-comment d-flex wow fadeIn">
                                        <span className="item-count vertical-align">
                                            <a
                                                className="red-tooltip author-avatar"
                                                href="#"
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title=""
                                                data-original-title="Johny - 445 posts"
                                            >
                                                <img src="assets/imgs/authors/author-3.png" alt="" />
                                            </a>
                                        </span>
                                        <div className="alith_post_title_small">
                                            <p className="font-medium mb-10">
                                                <a href="single.html">
                                                    Teamwork begins by building trust. And the only way to do that
                                                    is to overcome our need for invulnerability.
                                                </a>
                                            </p>
                                            <div className="entry-meta meta-1 font-x-small color-grey float-left text-uppercase mb-10">
                                                <span className="post-by">
                                                    By <a href="author.html">D. Johny</a>
                                                </span>
                                                <span className="post-on">4m ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default BaiViet;